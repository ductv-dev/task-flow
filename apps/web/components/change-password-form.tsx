"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema } from "@workspace/shared-schema";
import z from "zod";
import { changePasswordAction } from "@/actions/profile.action";
import { toast } from "@workspace/ui/components/sonner";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@workspace/ui/components/card";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

type FormValues = z.infer<typeof ChangePasswordSchema>;

export const ChangePasswordForm = () => {
    const router = useRouter();
    const logoutStore = useAuthStore((state) => state.logout);

    const form = useForm<FormValues>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        const result = await changePasswordAction(data);

        if (result?.error) {
            toast.error(result.error);
            form.setError("root", { message: result.error });
            return;
        }

        toast.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
        form.reset();

        // Auto logout upon password change
        logoutStore();
        router.push("/auth/login");
        router.refresh();
    };

    return (
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle>Đổi mật khẩu</CardTitle>
                <CardDescription>
                    Mật khẩu mới phải có ít nhất 6 ký tự. Sau khi đổi thành công, bạn sẽ được yêu cầu đăng nhập lại.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup className="flex flex-col gap-4">
                        {form.formState.errors.root && (
                            <p className="text-sm text-red-500 font-medium">
                                {form.formState.errors.root.message}
                            </p>
                        )}

                        <Field>
                            <FieldLabel htmlFor="currentPassword">Mật khẩu hiện tại</FieldLabel>
                            <Input
                                id="currentPassword"
                                type="password"
                                {...form.register("currentPassword")}
                                className={form.formState.errors.currentPassword ? "border-red-500" : ""}
                            />
                            {form.formState.errors.currentPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.formState.errors.currentPassword.message as string}
                                </p>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="newPassword">Mật khẩu mới</FieldLabel>
                            <Input
                                id="newPassword"
                                type="password"
                                {...form.register("newPassword")}
                                className={form.formState.errors.newPassword ? "border-red-500" : ""}
                            />
                            {form.formState.errors.newPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.formState.errors.newPassword.message as string}
                                </p>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="confirmPassword">Xác nhận mật khẩu mới</FieldLabel>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...form.register("confirmPassword")}
                                className={form.formState.errors.confirmPassword ? "border-red-500" : ""}
                            />
                            {form.formState.errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.formState.errors.confirmPassword.message as string}
                                </p>
                            )}
                        </Field>

                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-2">
                            {form.formState.isSubmitting ? "Đang lưu..." : "Đổi mật khẩu"}
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
};
