import { NextResponse } from 'next/server';
import { productStore } from '@/lib/productStore';

export async function GET() {
  try {
    const categories = productStore.getCategories();
    
    return NextResponse.json({
      success: true,
      data: categories,
      message: '获取商品类别成功'
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: '获取商品类别失败'
    }, { status: 500 });
  }
}