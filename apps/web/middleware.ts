import { toast } from "@workspace/ui/components/sonner";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const pathname = request.nextUrl.pathname;

  // Các route không cần bảo vệ
  const publicRoutes = ["/auth/login", "/auth/register"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Cho phép truy cập trang chủ landing page
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Nếu có token và đang ở trang login/register -> redirect về dashboard
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Nếu không có token và không phải public route (và không phải root "/") -> redirect về login
  if (!token && !isPublicRoute && pathname !== "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Cấu hình áp dụng middleware cho các route nào
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
