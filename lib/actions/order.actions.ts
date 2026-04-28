"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function createOrder(data: {
  orderHash: string;
  totalAmount: number;
  items: Array<{ productId: string; name: string; price: number; size: string; color: string; quantity: number }>;
  customerName?: string;
}) {
  noStore();
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      // Generate semi-intelligent mock data for the problem statement
      const riskPercent = Math.floor(Math.random() * 32) + 4; // 4% to 36%
      const reasons = [
        "Perfect size match",
        "Slightly loose fit",
        "Customer history: Low returns",
        "Model 2: 98% confidence",
        "Negative review regarding sizing",
        "Size mismatch: Recommended L",
        "First time buyer risk"
      ];
      const riskReasons = riskPercent > 20 ? reasons[Math.floor(Math.random() * 3) + 4] : reasons[Math.floor(Math.random() * 4)];
      const carbonSaved = parseFloat((data.items.reduce((sum, i) => sum + (i.quantity * 1.65), 0)).toFixed(2));

      const order = await prisma.order.create({
        data: {
          orderHash: data.orderHash,
          customerName: data.customerName || "Alex Carter",
          totalAmount: data.totalAmount,
          riskPercent: riskPercent,
          carbonSaved: carbonSaved,
          riskReasons: riskReasons,
          status: "CONFIRMED",
        },
      });

      // Prisma HTTP Adapter does not support transactions (which createMany and nested writes use).
      // So we insert items separately using concurrent non-transactional inserts.
      if (data.items.length > 0) {
        await Promise.all(
          data.items.map((item) =>
            prisma.orderItem.create({
              data: {
                orderId: order.id,
                productId: item.productId,
                name: item.name,
                price: item.price,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
              },
            })
          )
        );
      }
      
      revalidatePath("/dashboard");
      return { success: true, orderId: order.id };
    } catch (error) {
      attempts++;
      console.error(`Database attempt ${attempts} failed:`, error);
      if (attempts >= maxAttempts) {
        return { success: false, error: "Failed to create order after 3 attempts" };
      }
      // Wait 1s before retrying
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return { success: false, error: "Max attempts reached" };
}

export async function getDashboardStats() {
  noStore();
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
    });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
    const productsSold = orders.reduce((sum: number, order: any) => {
      return sum + order.items.reduce((itemSum: number, item: any) => itemSum + item.quantity, 0);
    }, 0);
    const totalCarbonSaved = orders.reduce((sum: number, order: any) => sum + (order.carbonSaved || 0), 0);
    const avgRisk = totalOrders > 0 
      ? orders.reduce((sum: number, order: any) => sum + (order.riskPercent || 0), 0) / totalOrders 
      : 0;
    
    // Accuracy rate: simulate based on low-risk orders
    const accuracyRate = totalOrders > 0 
      ? (orders.filter((o: any) => o.riskPercent < 15).length / totalOrders) * 100 
      : 96.8; // Default fallback

    return {
      success: true,
      totalOrders,
      totalRevenue,
      productsSold,
      totalCarbonSaved,
      avgRisk: parseFloat(avgRisk.toFixed(1)),
      accuracyRate: parseFloat(accuracyRate.toFixed(1))
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return { success: false, totalOrders: 0, totalRevenue: 0, productsSold: 0, totalCarbonSaved: 0, avgRisk: 0, accuracyRate: 96.8 };
  }
}

export async function getRecentOrders() {
  noStore();
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { items: true },
    });
    return { success: true, orders };
  } catch (error) {
    console.error("Failed to get recent orders:", error);
    return { success: false, orders: [] };
  }
}
