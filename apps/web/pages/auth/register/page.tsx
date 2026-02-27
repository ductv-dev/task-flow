"use client";
import { Button } from "@workspace/ui/components/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";
import { useRegisterForm } from "@/hooks/use-register-form";

export default function RegisterPage() {
    const { form, onSubmit, isSubmitting, errors } = useRegisterForm();

    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>
                            Enter your details below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onSubmit}>
                            <FieldGroup className="flex flex-col gap-6">
                                {errors.root && (
                                    <p className="text-sm text-red-500 text-center">
                                        {errors.root.message}
                                    </p>
                                )}

                                <Field>
                                    <FieldLabel htmlFor="name">Họ và Tên</FieldLabel>
                                    <Input
                                        id="name"
                                        {...form.register("name")}
                                        placeholder="Nguyễn Văn A"
                                        className={`w-full transition-colors ${errors.name
                                            ? "border-red-500 focus-visible:ring-red-500"
                                            : ""
                                            }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        {...form.register("email")}
                                        placeholder="m@example.com"
                                        className={`w-full transition-colors ${errors.email
                                            ? "border-red-500 focus-visible:ring-red-500"
                                            : ""
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        {...form.register("password")}
                                        placeholder="******"
                                        className={`w-full transition-colors ${errors.password
                                            ? "border-red-500 focus-visible:ring-red-500"
                                            : ""
                                            }`}
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="confirmPassword">Nhập lại mật khẩu</FieldLabel>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        {...form.register("confirmPassword")}
                                        placeholder="******"
                                        className={`w-full transition-colors ${errors.confirmPassword
                                            ? "border-red-500 focus-visible:ring-red-500"
                                            : ""
                                            }`}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </Field>

                                <Field className="space-y-4 pt-2">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full"
                                    >
                                        {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                                    </Button>

                                    <FieldDescription className="text-center">
                                        Already have an account?{" "}
                                        <Link href="/auth/login" className="underline underline-offset-4">
                                            Log in
                                        </Link>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
