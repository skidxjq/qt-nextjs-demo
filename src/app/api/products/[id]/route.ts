import { NextRequest, NextResponse } from 'next/server';
import { productStore } from '@/lib/productStore';
import { UpdateProductRequest } from '@/types/product';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json({
        success: false,
        message: '无效的商品ID'
      }, { status: 400 });
    }

    const product = productStore.getById(productId);
    
    if (!product) {
      return NextResponse.json({
        success: false,
        message: '商品不存在'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: '获取商品详情成功'
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: '获取商品详情失败'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json({
        success: false,
        message: '无效的商品ID'
      }, { status: 400 });
    }

    const body: UpdateProductRequest = await request.json();
    
    // 验证输入
    if (body.name !== undefined && body.name.trim() === '') {
      return NextResponse.json({
        success: false,
        message: '商品名称不能为空'
      }, { status: 400 });
    }

    if (body.price !== undefined && body.price <= 0) {
      return NextResponse.json({
        success: false,
        message: '商品价格必须大于0'
      }, { status: 400 });
    }

    if (body.category !== undefined && body.category.trim() === '') {
      return NextResponse.json({
        success: false,
        message: '商品类别不能为空'
      }, { status: 400 });
    }

    if (body.stock !== undefined && body.stock < 0) {
      return NextResponse.json({
        success: false,
        message: '库存数量不能小于0'
      }, { status: 400 });
    }

    const updateData = {
      name: body.name?.trim(),
      price: body.price,
      category: body.category?.trim(),
      stock: body.stock,
      description: body.description?.trim(),
    };

    const updatedProduct = productStore.update(productId, updateData);

    if (!updatedProduct) {
      return NextResponse.json({
        success: false,
        message: '商品不存在'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: '更新商品成功'
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: '更新商品失败'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json({
        success: false,
        message: '无效的商品ID'
      }, { status: 400 });
    }

    const deleted = productStore.delete(productId);
    
    if (!deleted) {
      return NextResponse.json({
        success: false,
        message: '商品不存在'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: '删除商品成功'
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: '删除商品失败'
    }, { status: 500 });
  }
}