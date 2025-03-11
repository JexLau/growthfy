// app/api/twitter/search/route.ts
import { SOCIALDATA_API_KEY, SOCIALDATA_BASE_URL } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

// 定义查询参数接口
interface TwitterSearchParams {
  query: string;
  limit?: number;
  fromDate?: string;
  toDate?: string;
  includeRetweets?: boolean;
  filterVerified?: boolean;
  includeReplies?: boolean;
  mediaType?: 'images' | 'videos' | 'links' | 'all';
  language?: string;
  sortBy?: 'relevance' | 'recency';
  next_token?: string;
  min_retweets?: number;
  min_faves?: number;
  min_replies?: number;
  near_location?: string;
  within_distance?: string;
}

/**
 * 将我们的查询参数转换为 socialdata 接口所需的格式
 */
function buildSocialDataQuery(params: TwitterSearchParams): string {
  let query = params.query || '';
  
  // 如果查询中已经包含高级操作符，就不需要再添加了
  const hasAdvancedOperators = /\b(from:|to:|@|filter:|min_|lang:|url:|near:|since:|until:)\b/.test(query);
  
  if (!hasAdvancedOperators) {
    // 处理时间范围
    if (params.fromDate && params.toDate) {
      query += ` since:${params.fromDate} until:${params.toDate}`;
    } else if (params.fromDate) {
      query += ` since:${params.fromDate}`;
    } else if (params.toDate) {
      query += ` until:${params.toDate}`;
    }

    // 处理回复和转发
    if (params.includeReplies === false) {
      query += ` -filter:replies`;
    }

    if (params.includeRetweets === false) {
      query += ` -filter:nativeretweets`;
    } else if (params.includeRetweets === true) {
      query += ` include:nativeretweets`;
    }

    // 处理验证账号
    if (params.filterVerified === true) {
      query += ` filter:blue_verified`;
    }

    // 处理媒体类型
    if (params.mediaType) {
      switch (params.mediaType) {
        case 'images':
          query += ` filter:images`;
          break;
        case 'videos':
          query += ` filter:videos`;
          break;
        case 'links':
          query += ` filter:links`;
          break;
        case 'all':
          query += ` filter:media`;
          break;
      }
    }

    // 处理语言
    if (params.language) {
      query += ` lang:${params.language}`;
    }
    
    // 添加互动筛选
    if (params.min_retweets) {
      query += ` min_retweets:${params.min_retweets}`;
    }
    
    if (params.min_faves) {
      query += ` min_faves:${params.min_faves}`;
    }
    
    if (params.min_replies) {
      query += ` min_replies:${params.min_replies}`;
    }
    
    // 地理位置筛选
    if (params.near_location) {
      query += ` near:"${params.near_location}"`;
      
      if (params.within_distance) {
        query += ` within:${params.within_distance}`;
      }
    }
  }

  return query.trim();
}

/**
 * Twitter 搜索 API 路由处理
 */
export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const nextToken = searchParams.get('next_token');

    // 检查必要参数
    if (!query) {
      return NextResponse.json(
        { error: 'Missing required parameter: query' },
        { status: 400 }
      );
    }

    if (!SOCIALDATA_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // 构建参数对象
    const params: TwitterSearchParams = {
      query,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 100,
      fromDate: searchParams.get('fromDate') || undefined,
      toDate: searchParams.get('toDate') || undefined,
      includeRetweets: searchParams.get('includeRetweets') === 'true',
      filterVerified: searchParams.get('filterVerified') === 'true',
      includeReplies: searchParams.get('includeReplies') !== 'false',
      mediaType: searchParams.get('mediaType') as TwitterSearchParams['mediaType'] || undefined,
      language: searchParams.get('language') || undefined,
      sortBy: searchParams.get('sortBy') as TwitterSearchParams['sortBy'] || 'recency',
      next_token: nextToken || undefined,
      min_retweets: searchParams.get('min_retweets') ? parseInt(searchParams.get('min_retweets')!, 10) : undefined,
      min_faves: searchParams.get('min_faves') ? parseInt(searchParams.get('min_faves')!, 10) : undefined,
      min_replies: searchParams.get('min_replies') ? parseInt(searchParams.get('min_replies')!, 10) : undefined,
      near_location: searchParams.get('near_location') || undefined,
      within_distance: searchParams.get('within_distance') || undefined
    };

    // 构建查询字符串
    const socialDataQuery = buildSocialDataQuery(params);
    // console.log('Twitter搜索查询:', socialDataQuery); // 记录最终查询

    // 请求 socialdata API
    const url = new URL(`${SOCIALDATA_BASE_URL}/search?query=${socialDataQuery}`);

    console.log('发送请求到:', url.toString()); // 记录请求URL

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SOCIALDATA_API_KEY}`
      },
    });

    // 处理响应
    if (!response?.ok) {
      console.log('response', response);
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Error from socialdata API', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // 记录API返回的原始数据结构
    console.log('社交数据API返回结构:', JSON.stringify({
      keys: Object.keys(data),
      hasStatuses: !!data.statuses,
      hasTweets: !!data.tweets,
      hasResults: !!data.results,
      sampleData: data.tweets?.[0] || data.results?.[0] || data.statuses?.[0] || null
    }, null, 2));
    
    // 转换数据格式为TwitterSearchResponse
    const formattedResponse = {
      statuses: data.tweets || data.results || data.statuses || [],
      search_metadata: {
        completed_in: data.search_metadata?.completed_in || 0,
        max_id: parseInt(data.search_metadata?.max_id_str || '0'),
        max_id_str: data.search_metadata?.max_id_str || '0',
        next_results: data.search_metadata?.next_results,
        query: query,
        count: params.limit || 10,
        since_id: parseInt(data.search_metadata?.since_id_str || '0'),
        since_id_str: data.search_metadata?.since_id_str || '0'
      }
    };
    
    return NextResponse.json(formattedResponse);

  } catch (error) {
    console.error('Twitter search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: (error as Error).message },
      { status: 500 }
    );
  }
}

// 可选: 如果你的 API 也接受 POST 请求
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json();

    if (!body.query) {
      return NextResponse.json(
        { error: 'Missing required parameter: query' },
        { status: 400 }
      );
    }

    if (!SOCIALDATA_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // 构建参数对象
    const params: TwitterSearchParams = {
      query: body.query,
      limit: body.limit || 100,
      fromDate: body.fromDate,
      toDate: body.toDate,
      includeRetweets: body.includeRetweets,
      filterVerified: body.filterVerified,
      includeReplies: body.includeReplies !== false,
      mediaType: body.mediaType,
      language: body.language,
      sortBy: body.sortBy || 'recency',
      next_token: body.next_token,
      min_retweets: body.min_retweets ? parseInt(body.min_retweets, 10) : undefined,
      min_faves: body.min_faves ? parseInt(body.min_faves, 10) : undefined,
      min_replies: body.min_replies ? parseInt(body.min_replies, 10) : undefined,
      near_location: body.near_location || undefined,
      within_distance: body.within_distance || undefined
    };

    // 构建查询字符串
    const socialDataQuery = buildSocialDataQuery(params);
    console.log('Twitter搜索查询 (POST):', socialDataQuery); // 记录最终查询

    // 请求 socialdata API
    const response = await fetch(`${SOCIALDATA_BASE_URL}/search?query=${socialDataQuery}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SOCIALDATA_API_KEY}`
      }
    });
    
    console.log('POST请求发送完成'); // 记录请求完成

    // 处理响应
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Error from socialdata API', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // 记录API返回的原始数据结构
    console.log('社交数据API返回结构:', JSON.stringify({
      keys: Object.keys(data),
      hasStatuses: !!data.statuses,
      hasTweets: !!data.tweets,
      hasResults: !!data.results,
      sampleData: data.tweets?.[0] || data.results?.[0] || data.statuses?.[0] || null
    }, null, 2));
    
    // 转换数据格式为TwitterSearchResponse
    const formattedResponse = {
      statuses: data.tweets || data.results || data.statuses || [],
      search_metadata: {
        completed_in: data.search_metadata?.completed_in || 0,
        max_id: parseInt(data.search_metadata?.max_id_str || '0'),
        max_id_str: data.search_metadata?.max_id_str || '0',
        next_results: data.search_metadata?.next_results,
        query: body.query,
        count: params.limit || 10,
        since_id: parseInt(data.search_metadata?.since_id_str || '0'),
        since_id_str: data.search_metadata?.since_id_str || '0'
      }
    };
    
    return NextResponse.json(formattedResponse);

  } catch (error) {
    console.error('Twitter search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: (error as Error).message },
      { status: 500 }
    );
  }
}