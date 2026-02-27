"use server";

import { cookies } from "next/headers";
import { ChangePasswordSchema } from "@workspace/shared-schema";
import z from "zod";
import "dotenv/config";

const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
};

export async function changePasswordAction(
  data: z.infer<typeof ChangePasswordSchema>,
) {
  const token = await getAuthToken();
  if (!token) return { error: "Vui lòng đăng nhập lại" };

  const parsed = ChangePasswordSchema.safeParse(data);
  if (!parsed.success) return { error: "Dữ liệu không hợp lệ" };

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(parsed.data),
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        const cookieStore = await cookies();
        cookieStore.delete("access_token");
      }
      return { error: result?.message || "Đổi mật khẩu thất bại" };
    }

    return { success: true, message: result.message };
  } catch (error) {
    console.error("Change Password Error:", error);
    return { error: "Lỗi hệ thống" };
  }
}
