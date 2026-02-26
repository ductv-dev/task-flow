"use server";

import { cookies } from "next/headers";
import { LoginSchema } from "@workspace/shared-schema";
import z from "zod";
import "dotenv/config";

type LoginValues = z.infer<typeof LoginSchema>;

export async function loginAction(data: LoginValues) {
  // 1. Validate lại dữ liệu trên server (Security layer 2)
  const parsed = LoginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Dữ liệu không hợp lệ" };
  }

  try {
    // 2. Gọi API đến Backend thật của bạn (VD: NestJS, Go, Express)

    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || "Sai tài khoản hoặc mật khẩu" };
    }

    // 3. Set Cookie bảo mật (httpOnly = true chặn JS can thiệp)
    (
      await // 3. Set Cookie bảo mật (httpOnly = true chặn JS can thiệp)
      cookies()
    ).set({
      name: "access_token",
      value: result.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true, user: result.user };
  } catch (error) {
    console.error("Login Server Action Error:", error);
    return { error: "Lỗi hệ thống, vui lòng thử lại sau" };
  }
}
