import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { CheckCircle2Icon, ArrowRightIcon } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
                <Link className="flex items-center justify-center gap-2" href="/">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <CheckCircle2Icon className="size-5" />
                    </div>
                    <span className="font-bold tracking-tight text-xl">TaskFlow</span>
                </Link>
                <nav className="flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Tính năng
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Mức giá
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Về chúng tôi
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2 max-w-3xl">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Quản lý công việc thông minh cùng TaskFlow
                                </h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl p-4">
                                    Sắp xếp, theo dõi và hoàn thành mọi mục tiêu của bạn một cách dễ dàng.
                                    Giao diện trực quan, tính năng mạnh mẽ, nâng cao hiệu suất làm việc mỗi ngày.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button asChild size="lg" className="h-12 px-8">
                                    <Link href="/auth/register">
                                        Bắt đầu miễn phí <ArrowRightIcon className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                                    <Link href="/auth/login">
                                        Đăng nhập
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 flex justify-center">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <CheckCircle2Icon className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-xl font-bold">Quản lý linh hoạt</h2>
                                <p className="text-muted-foreground">Tạo và theo dõi các tác vụ mọi lúc mọi nơi.</p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <CheckCircle2Icon className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-xl font-bold">Giao diện hiện đại</h2>
                                <p className="text-muted-foreground">Trải nghiệm môi trường làm việc tập trung, tối giản.</p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <CheckCircle2Icon className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-xl font-bold">Bảo mật cao</h2>
                                <p className="text-muted-foreground">Dữ liệu cá nhân của bạn luôn được mã hóa an toàn.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t font-medium text-sm text-muted-foreground justify-center">
                <p>© 2026 TaskFlow. All rights reserved.</p>
            </footer>
        </div>
    );
}
