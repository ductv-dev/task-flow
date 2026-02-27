"use server";

import { cookies } from "next/headers";

export const getMeAction = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
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
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Get Me Action Error:", error);
    return null;
  }
};
