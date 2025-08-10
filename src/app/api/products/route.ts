import { NextRequest, NextResponse } from 'next/server';
import { productStore } from '@/lib/productStore';
import { CreateProductRequest } from '@/types/product';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 记录请求信息
    console.log('=== GET /api/products ===');
    console.log('Request URL:', request.url);
    console.log('Request Method:', request.method);
    console.log('Request Headers:', Object.fromEntries(request.headers.entries()));
    console.log('Timestamp:', new Date().toISOString());
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // 记录解析后的参数
    console.log('Parsed Parameters:', { category, search, page, limit });
    
    const result = productStore.getAll({ category, search, page, limit });
    
    const response = {
      success: true,
      data: result,
      message: '获取商品列表成功'
    };
    
    // 记录响应信息
    const processingTime = Date.now() - startTime;
    console.log('Response Status:', 200);
    console.log('Response Data:', response);
    console.log('Processing Time:', `${processingTime}ms`);
    console.log('=== END GET /api/products ===\n');
    
    return NextResponse.json(response);
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('=== ERROR GET /api/products ===');
    console.error('Error:', error);
    console.error('Processing Time:', `${processingTime}ms`);
    console.error('=== END ERROR GET /api/products ===\n');
    
    return NextResponse.json({
      success: false,
      message: '获取商品列表失败'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 记录请求信息
    console.log('=== POST /api/products ===');
    console.log('Request URL:', request.url);
    console.log('Request Method:', request.method);
    console.log('Request Headers:', Object.fromEntries(request.headers.entries()));
    console.log('Timestamp:', new Date().toISOString());
    
    const body: CreateProductRequest = await request.json();
    
    // 记录请求体
    console.log('Request Body:', body);
    
    if (!body.name || body.name.trim() === '') {
      const errorResponse = {
        success: false,
        message: '商品名称不能为空'
      };
      console.log('Validation Error - Response Status:', 400);
      console.log('Validation Error - Response Data:', errorResponse);
      console.log('Processing Time:', `${Date.now() - startTime}ms`);
      console.log('=== END POST /api/products (Validation Error) ===\n');
      
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (!body.price || body.price <= 0) {
      const errorResponse = {
        success: false,
        message: '商品价格必须大于0'
      };
      console.log('Validation Error - Response Status:', 400);
      console.log('Validation Error - Response Data:', errorResponse);
      console.log('Processing Time:', `${Date.now() - startTime}ms`);
      console.log('=== END POST /api/products (Validation Error) ===\n');
      
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (!body.category || body.category.trim() === '') {
      const errorResponse = {
        success: false,
        message: '商品类别不能为空'
      };
      console.log('Validation Error - Response Status:', 400);
      console.log('Validation Error - Response Data:', errorResponse);
      console.log('Processing Time:', `${Date.now() - startTime}ms`);
      console.log('=== END POST /api/products (Validation Error) ===\n');
      
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (!body.stock || body.stock < 0) {
      const errorResponse = {
        success: false,
        message: '库存数量不能小于0'
      };
      console.log('Validation Error - Response Status:', 400);
      console.log('Validation Error - Response Data:', errorResponse);
      console.log('Processing Time:', `${Date.now() - startTime}ms`);
      console.log('=== END POST /api/products (Validation Error) ===\n');
      
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const product = productStore.create({
      name: body.name.trim(),
      price: body.price,
      category: body.category.trim(),
      stock: body.stock,
      description: body.description?.trim(),
    });

    const response = {
      success: true,
      data: product,
      message: '创建商品成功'
    };
    
    // 记录成功响应信息
    const processingTime = Date.now() - startTime;
    console.log('Response Status:', 201);
    console.log('Response Data:', response);
    console.log('Processing Time:', `${processingTime}ms`);
    console.log('=== END POST /api/products ===\n');

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('=== ERROR POST /api/products ===');
    console.error('Error:', error);
    console.error('Processing Time:', `${processingTime}ms`);
    console.error('=== END ERROR POST /api/products ===\n');
    
    return NextResponse.json({
      success: false,
      message: '创建商品失败'
    }, { status: 500 });
  }
}