"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "@workspace/ui/components/sonner";
import { useAuthStore } from "@/store/auth-store";

interface AuthProviderProps {
  user: any;
  children: React.ReactNode;
}

export function AuthProvider({ user, children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isInitialized = useRef(false);

  const [isMounted, setIsMounted] = useState(false);

  if (!isInitialized.current) {
    useAuthStore.setState({ user, isAuthenticated: !!user });
    isInitialized.current = true;
  }

  useEffect(() => {
    setIsMounted(true);
    const isAuthPage = pathname?.startsWith("/auth");
    const isRoot = pathname === "/";

    // Unauthenticated user trying to access protected route
    if (!user && !isAuthPage && !isRoot) {
      toast.error("Vui lòng đăng nhập để tiếp tục!");
      router.push("/auth/login");
    }

    // Authenticated user accessing root landing page -> go to dashboard
    if (user && isRoot) {
      router.push("/dashboard");
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
