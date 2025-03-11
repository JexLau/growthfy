import { useState, useEffect } from 'react';
import { TwitterUser, TwitterTweet } from '@/types/twitter';

interface UseTwitterUserProps {
  screenName?: string;
  userId?: string;
  autoFetch?: boolean;
}

interface UseTwitterUserReturn {
  user: TwitterUser | null;
  loading: boolean;
  error: Error | null;
  fetchUser: (params: { screenName?: string; userId?: string }) => Promise<void>;
}

export function useTwitterUser({ 
  screenName, 
  userId, 
  autoFetch = false 
}: UseTwitterUserProps = {}): UseTwitterUserReturn {
  const [user, setUser] = useState<TwitterUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async (params: { screenName?: string; userId?: string }) => {
    const { screenName: newScreenName, userId: newUserId } = params;
    
    if (!newScreenName && !newUserId) {
      setError(new Error('Screen name or user ID is required'));
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // 构建查询参数
      const queryParams = new URLSearchParams();
      if (newScreenName) queryParams.set('screen_name', newScreenName);
      if (newUserId) queryParams.set('user_id', newUserId);
      
      const response = await fetch(`/api/twitter/user?${queryParams.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user data');
      }
      
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && (screenName || userId)) {
      fetchUser({ screenName, userId });
    }
  }, [autoFetch, screenName, userId]);

  return {
    user,
    loading,
    error,
    fetchUser
  };
}

// hooks/useTwitterUserTimeline.ts
interface UseTwitterUserTimelineProps {
  screenName?: string;
  userId?: string;
  count?: number;
  includeRts?: boolean;
  excludeReplies?: boolean;
  autoFetch?: boolean;
}

interface UseTwitterUserTimelineReturn {
  tweets: TwitterTweet[];
  loading: boolean;
  error: Error | null;
  fetchTimeline: (params: { 
    screenName?: string; 
    userId?: string;
    count?: number;
    includeRts?: boolean;
    excludeReplies?: boolean;
  }) => Promise<void>;
}

export function useTwitterUserTimeline({ 
  screenName, 
  userId, 
  count = 20,
  includeRts = true,
  excludeReplies = false,
  autoFetch = false 
}: UseTwitterUserTimelineProps = {}): UseTwitterUserTimelineReturn {
  const [tweets, setTweets] = useState<TwitterTweet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTimeline = async (params: { 
    screenName?: string; 
    userId?: string;
    count?: number;
    includeRts?: boolean;
    excludeReplies?: boolean;
  }) => {
    const { 
      screenName: newScreenName, 
      userId: newUserId,
      count: newCount = count,
      includeRts: newIncludeRts = includeRts,
      excludeReplies: newExcludeReplies = excludeReplies
    } = params;
    
    if (!newScreenName && !newUserId) {
      setError(new Error('Screen name or user ID is required'));
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // 构建查询参数
      const queryParams = new URLSearchParams();
      if (newScreenName) queryParams.set('screen_name', newScreenName);
      if (newUserId) queryParams.set('user_id', newUserId);
      queryParams.set('count', newCount.toString());
      queryParams.set('include_rts', newIncludeRts.toString());
      queryParams.set('exclude_replies', newExcludeReplies.toString());
      
      const response = await fetch(`/api/twitter/user/timeline?${queryParams.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user timeline');
      }
      
      const data = await response.json();
      setTweets(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && (screenName || userId)) {
      fetchTimeline({ screenName, userId, count, includeRts, excludeReplies });
    }
  }, [autoFetch, screenName, userId, count, includeRts, excludeReplies]);

  return {
    tweets,
    loading,
    error,
    fetchTimeline
  };
}