import { SOCIALDATA_API_KEY, SOCIALDATA_BASE_URL } from '@/constants';
import { NextResponse } from 'next/server';
/**
 * 获取 Twitter 趋势可用地区列表
 */
export async function GET() {
  try {
    if (!SOCIALDATA_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }
    
    // 请求 socialdata API
    const response = await fetch(`${SOCIALDATA_BASE_URL}/trends/available`, {
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
    console.error('Twitter available trends API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: (error as Error).message },
      { status: 500 }
    );
  }
}