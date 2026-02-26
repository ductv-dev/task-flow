// src/features/auth/store/useAuthStore.ts
import { create } from "zustand";

// 1. Định nghĩa Type cho User và State
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  // Các actions để cập nhật state
  login: (userData: User) => void;
  logout: () => void;
}

// 2. Khởi tạo Store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  // Hàm gọi khi login thành công
  login: (userData) => set({ user: userData, isAuthenticated: true }),

  // Hàm gọi khi user bấm đăng xuất
  logout: () => set({ user: null, isAuthenticated: false }),
}));
