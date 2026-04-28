"use server";

import prisma from "../prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUserIntelligence(measurements: any) {
  const user = await currentUser();
  if (!user) return { success: false, msg: "User not authenticated." };

  const clerkId = user.id;
  const email = user.emailAddresses[0]?.emailAddress || "";
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";

  try {
    const updatedUser = await prisma.user.upsert({
      where: { clerkId },
      update: {
        height: measurements.height || undefined,
        weight: measurements.weight || undefined,
        chest: measurements.chest || undefined,
        waist: measurements.waist || undefined,
        hips: measurements.hips || undefined,
        inseam: measurements.inseam || undefined,
      },
      create: {
        clerkId,
        email,
        firstName,
        lastName,
        height: measurements.height || null,
        weight: measurements.weight || null,
        chest: measurements.chest || null,
        waist: measurements.waist || null,
        hips: measurements.hips || null,
        inseam: measurements.inseam || null,
      }
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Database intelligence sync failed:", error);
    return { success: false, error };
  }
}

export async function getCloudIntelligence() {
  const user = await currentUser();
  if (!user) return { success: false, profile: null };

  try {
    const profile = await prisma.user.findUnique({
      where: { clerkId: user.id }
    });
    return { success: true, profile };
  } catch (error) {
    return { success: false, profile: null };
  }
}
