'use server';

import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// 1. Cambiar estado del pedido
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
  revalidatePath('/admin');
}

// 2. Descontar mililitros cuando vendes un decant manualmente o por sistema
export async function deductProductMl(productId: string, mlAmount: number) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Producto no encontrado");

  const newMl = Math.max(0, product.currentMl - mlAmount);

  await prisma.product.update({
    where: { id: productId },
    data: { currentMl: newMl },
  });
  revalidatePath('/admin');
}