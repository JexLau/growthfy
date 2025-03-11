
import { SOCIALDATA_API_KEY, SOCIALDATA_BASE_URL } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const screenName = searchParams.get('screen_name');
    const userId = searchParams.get('user_id');
    const count = searchParams.get('count') || '20';
    const includeRts = searchParams.get('include_rts') || 'true';
    const excludeReplies = searchParams.get('exclude_replies') || 'false';
    
    // 必须提供 screen_name 或 user_id 之一
    if (!screenName && !userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: screen_name or user_id' },
        { status: 400 }
      );
    }
    
    if (!SOCIALDATA_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }
    
    // 构建查询参数
    const queryParams = new URLSearchParams();
    if (screenName) queryParams.set('screen_name', screenName);
    if (userId) queryParams.set('user_id', userId);
    queryParams.set('count', count);
    queryParams.set('include_rts', includeRts);
    queryParams.set('exclude_replies', excludeReplies);
    
    // 请求 socialdata API
    const response = await fetch(`${SOCIALDATA_BASE_URL}/statuses/user_timeline?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SOCIALDATA_API_KEY}`
      }
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
    console.error('Twitter user timeline API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: (error as Error).message },
      { status: 500 }
    );
  }
}