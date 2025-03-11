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
}

/**
 * 将我们的查询参数转换为 socialdata 接口所需的格式
 */
function buildSocialDataQuery(params: TwitterSearchParams): string {
  let query = params.query;

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
    query += ` filter:verified`;
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

  return query;
}

/**
 * Twitter 搜索 API 路由处理
 */
export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

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
    };

    // 构建查询字符串
    const socialDataQuery = buildSocialDataQuery(params);

    // 请求 socialdata API
    const response = await fetch(`${SOCIALDATA_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SOCIALDATA_API_KEY}`
      },
      body: JSON.stringify({
        query: socialDataQuery,
        limit: params.limit,
        sort_by: params.sortBy
      })
    });

    // 处理响应
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Error from socialdata API', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

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
    };

    // 构建查询字符串
    const socialDataQuery = buildSocialDataQuery(params);

    // 请求 socialdata API
    const response = await fetch(`${SOCIALDATA_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SOCIALDATA_API_KEY}`
      },
      body: JSON.stringify({
        query: socialDataQuery,
        limit: params.limit,
        sort_by: params.sortBy
      })
    });

    // 处理响应
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Error from socialdata API', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Twitter search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: (error as Error).message },
      { status: 500 }
    );
  }
}