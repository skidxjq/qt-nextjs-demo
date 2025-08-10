import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 记录请求信息
    console.log('=== POST /api/dingdoc/notify ===');
    console.log('Request URL:', request.url);
    console.log('Request Method:', request.method);
    console.log('Request Headers:', Object.fromEntries(request.headers.entries()));
    console.log('Timestamp:', new Date().toISOString());
    
    // 获取请求体
    const body = await request.json();
    
    // 记录请求体
    console.log('Request Body:', JSON.stringify(body, null, 2));
    
    // 模拟响应数据
    const response = {
      success: true,
      message: 'DingDoc通知接收成功',
      timestamp: new Date().toISOString(),
      data: {
        receivedAt: new Date().toISOString(),
        requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'processed'
      }
    };
    
    // 记录响应信息
    const processingTime = Date.now() - startTime;
    console.log('Response Status:', 200);
    console.log('Response Data:', JSON.stringify(response, null, 2));
    console.log('Processing Time:', `${processingTime}ms`);
    console.log('=== END POST /api/dingdoc/notify ===\n');
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('=== ERROR POST /api/dingdoc/notify ===');
    console.error('Error:', error);
    console.error('Processing Time:', `${processingTime}ms`);
    console.error('=== END ERROR POST /api/dingdoc/notify ===\n');
    
    const errorResponse = {
      success: false,
      message: 'DingDoc通知处理失败',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    
    console.log('Error Response:', JSON.stringify(errorResponse, null, 2));
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}