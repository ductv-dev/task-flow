"use client";

import { useAuthStore } from "@/store/auth-store";
import { ChangePasswordForm } from "@/components/change-password-form";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarInset, SidebarTrigger } from "@workspace/ui/components/sidebar";

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user);

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Hồ sơ cá nhân</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-8 p-4 pt-0">
                <div className="min-h-[calc(100vh-theme(spacing.20))] flex-1 rounded-xl bg-background border p-6 shadow-sm">
                    <h2 className="text-2xl font-bold tracking-tight mb-6">Hồ sơ của bạn</h2>

                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="flex-1 max-w-md space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-lg font-medium">Thông tin chung</h3>
                                <p className="text-sm text-muted-foreground">
                                    Thông tin cơ bản về tài khoản của bạn.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Họ và tên</label>
                                    <div className="mt-1 text-base">{user?.name || "Người dùng"}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <div className="mt-1 text-base">{user?.email || "Không rõ"}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="space-y-1 mb-6">
                                <h3 className="text-lg font-medium">Bảo mật</h3>
                                <p className="text-sm text-muted-foreground">
                                    Quản lý mật khẩu và bảo mật tài khoản.
                                </p>
                            </div>

                            <ChangePasswordForm />
                        </div>
                    </div>
                </div>
            </div>
        </SidebarInset>
    );
}
