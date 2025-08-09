import { NextRequest, NextResponse } from 'next/server';
import { productStore } from '@/lib/productStore';
import { CreateProductRequest } from '@/types/product';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const result = productStore.getAll({ category, search, page, limit });
    
    return NextResponse.json({
      success: true,
      data: result,
      message: '获取商品列表成功'
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: '获取商品列表失败'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateProductRequest = await request.json();
    
    if (!body.name || body.name.trim() === '') {
      return NextResponse.json({
        success: false,
        message: '商品名称不能为空'
      }, { status: 400 });
    }

    if (!body.price || body.price <= 0) {
      return NextResponse.json({
        success: false,
        message: '商品价格必须大于0'
      }, { status: 400 });
    }

    if (!body.category || body.category.trim() === '') {
      return NextResponse.json({
        success: false,
        message: '商品类别不能为空'
      }, { status: 400 });
    }

    if (!body.stock || body.stock < 0) {
      return NextResponse.json({
        success: false,
        message: '库存数量不能小于0'
      }, { status: 400 });
    }

    const product = productStore.create({
      name: body.name.trim(),
      price: body.price,
      category: body.category.trim(),
      stock: body.stock,
      description: body.description?.trim(),
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: '创建商品成功'
    }, { status: 201 });
  } catch {
    return NextResponse.json({
      success: false,
      message: '创建商品失败'
    }, { status: 500 });
  }
}