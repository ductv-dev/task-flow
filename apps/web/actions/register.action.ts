"use server";

import { RegisterSchema } from "@workspace/shared-schema";
import z from "zod";
import "dotenv/config";

type RegisterValues = z.infer<typeof RegisterSchema>;

export async function registerAction(data: RegisterValues) {
  // 1. Validate lại dữ liệu trên server (Security layer 2)
  const parsed = RegisterSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Dữ liệu không hợp lệ" };
  }

  try {
    // 2. Gọi API backend NestJS
    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || "Đăng ký không thành công" };
    }

    return { success: true };
  } catch (error) {
    console.error("Register Server Action Error:", error);
    return { error: "Lỗi hệ thống, vui lòng thử lại sau" };
  }
}
