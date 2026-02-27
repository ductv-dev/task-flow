"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreateTaskSchema, UpdateTaskSchema } from "@workspace/shared-schema";
import z from "zod";
import "dotenv/config";

const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
};

export async function getTasksAction() {
  const token = await getAuthToken();
  if (!token) return { error: "Không tìm thấy token", data: [] };

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        const cookieStore = await cookies();
        cookieStore.delete("access_token");
      }
      return { error: "Không thể lấy danh sách công việc", data: [] };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Get Tasks Error:", error);
    return { error: "Lỗi hệ thống", data: [] };
  }
}

export async function createTaskAction(data: z.infer<typeof CreateTaskSchema>) {
  const token = await getAuthToken();
  if (!token) return { error: "Vui lòng đăng nhập lại" };

  const parsed = CreateTaskSchema.safeParse(data);
  if (!parsed.success) return { error: "Dữ liệu không hợp lệ" };

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        const cookieStore = await cookies();
        cookieStore.delete("access_token");
      }
      const result = await response.json();
      return { error: result?.message || "Tạo công việc thất bại" };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Create Task Error:", error);
    return { error: "Lỗi hệ thống" };
  }
}

export async function updateTaskAction(
  id: string,
  data: z.infer<typeof UpdateTaskSchema>,
) {
  const token = await getAuthToken();
  if (!token) return { error: "Vui lòng đăng nhập lại" };

  const parsed = UpdateTaskSchema.safeParse(data);
  if (!parsed.success) return { error: "Dữ liệu không hợp lệ" };

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        const cookieStore = await cookies();
        cookieStore.delete("access_token");
      }
      const result = await response.json();
      return { error: result?.message || "Cập nhật công việc thất bại" };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Update Task Error:", error);
    return { error: "Lỗi hệ thống" };
  }
}

export async function deleteTaskAction(id: string) {
  const token = await getAuthToken();
  if (!token) return { error: "Vui lòng đăng nhập lại" };

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        const cookieStore = await cookies();
        cookieStore.delete("access_token");
      }
      const result = await response.json();
      return { error: result?.message || "Xóa công việc thất bại" };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete Task Error:", error);
    return { error: "Lỗi hệ thống" };
  }
}
