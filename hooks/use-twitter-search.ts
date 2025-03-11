import { useState, useEffect, useCallback } from 'react';
import { TwitterSearchParams, TwitterSearchResponse } from '@/types/twitter';

interface UseTwitterSearchProps {
  initialParams?: Partial<TwitterSearchParams>;
  autoFetch?: boolean;
}

interface UseTwitterSearchReturn {
  loading: boolean;
  error: Error | null;
  data: TwitterSearchResponse | null;
  search: (params: Partial<TwitterSearchParams>) => Promise<void>;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export function useTwitterSearch({ 
  initialParams = {}, 
  autoFetch = false 
}: UseTwitterSearchProps = {}): UseTwitterSearchReturn {
  const [params, setParams] = useState<TwitterSearchParams>({
    query: '',
    limit: 30,
    ...initialParams
  } as TwitterSearchParams);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TwitterSearchResponse | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [nextToken, setNextToken] = useState<string | null>(null);

  // 构建查询参数
  const buildQueryString = useCallback((searchParams: TwitterSearchParams, token?: string) => {
    const queryParams = new URLSearchParams();
    
    if (searchParams.query) queryParams.set('query', searchParams.query);
    if (searchParams.limit) queryParams.set('limit', searchParams.limit.toString());
    if (searchParams.fromDate) queryParams.set('fromDate', searchParams.fromDate);
    if (searchParams.toDate) queryParams.set('toDate', searchParams.toDate);
    if (searchParams.includeRetweets !== undefined) queryParams.set('includeRetweets', searchParams.includeRetweets.toString());
    if (searchParams.filterVerified !== undefined) queryParams.set('filterVerified', searchParams.filterVerified.toString());
    if (searchParams.includeReplies !== undefined) queryParams.set('includeReplies', searchParams.includeReplies.toString());
    if (searchParams.mediaType) queryParams.set('mediaType', searchParams.mediaType);
    if (searchParams.language) queryParams.set('language', searchParams.language);
    if (searchParams.sortBy) queryParams.set('sortBy', searchParams.sortBy);
    if (token) queryParams.set('next_token', token);
    
    return queryParams.toString();
  }, []);

  // 搜索函数
  const search = useCallback(async (newParams: Partial<TwitterSearchParams>) => {
    try {
      const updatedParams = { ...params, ...newParams };
      setParams(updatedParams);
      setLoading(true);
      setError(null);
      
      // 重置分页状态
      setNextToken(null);
      
      const queryString = buildQueryString(updatedParams);
      const response = await fetch(`/api/twitter/search?${queryString}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch Twitter data');
      }
      
      const result = await response.json();
      setData(result);
      
      // 检查是否有更多数据可加载
      if (result.search_metadata && result.search_metadata.next_results) {
        setHasMore(true);
        // 从 next_results 中提取 next_token
        const nextResultsParams = new URLSearchParams(result.search_metadata.next_results.substring(1));
        setNextToken(nextResultsParams.get('max_id'));
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [params, buildQueryString]);

  // 加载更多数据
  const loadMore = useCallback(async () => {
    if (!hasMore || !nextToken || loading) return;
    
    try {
      setLoading(true);
      
      const queryString = buildQueryString(params, nextToken);
      const response = await fetch(`/api/twitter/search?${queryString}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch more Twitter data');
      }
      
      const result = await response.json();
      
      // 合并新数据
      setData(prevData => {
        if (!prevData) return result;
        
        return {
          ...result,
          statuses: [...prevData.statuses, ...result.statuses]
        };
      });
      
      // 更新分页状态
      if (result.search_metadata && result.search_metadata.next_results) {
        setHasMore(true);
        const nextResultsParams = new URLSearchParams(result.search_metadata.next_results.substring(1));
        setNextToken(nextResultsParams.get('max_id'));
      } else {
        setHasMore(false);
        setNextToken(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [hasMore, nextToken, loading, params, buildQueryString]);

  // 自动获取
  useEffect(() => {
    if (autoFetch && params.query) {
      search(params);
    }
  }, [autoFetch, params, search]);

  return {
    loading,
    error,
    data,
    search,
    hasMore,
    loadMore
  };
}
