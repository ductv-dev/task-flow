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
import { toast } from "@workspace/ui/components/sonner";
import { Input } from "@workspace/ui/components/input";
import { LoginSchema } from "@workspace/shared-schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginAction } from "@/actions/login.action";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

type LoginFormValues = z.infer<typeof LoginSchema>;

export const LoginPage = () => {
  const loginToStore = useAuthStore((state) => state.login);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const result = await loginAction(data);

    if (result.error) {
      toast.error(result.error);
      setError("password", { type: "server", message: result.error });
      return;
    }

    if (result.success) {
      toast.success("Đăng nhập thành công!");
      loginToStore(result.user);
      // Có thể lưu user info vào Zustand store ở đây nếu cần
      router.push("/");
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="flex flex-col gap-6">
                {/* --- Field Email --- */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email" // 2. Thêm ID để match với htmlFor
                    {...register("email")}
                    placeholder="m@example.com"
                    // Nếu <Input> đã có sẵn style chuẩn, có thể bạn không cần truyền className dài thòong như này nữa
                    className={`w-full transition-colors ${
                      errors.email
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

                {/* --- Field Password --- */}
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  {/* 3. Dùng chung <Input> thay vì thẻ <input> thuần */}
                  <Input
                    id="password" // 4. Thêm ID
                    type="password"
                    {...register("password")}
                    placeholder="******"
                    className={`w-full transition-colors ${
                      errors.password
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

                {/* --- Submit Section --- */}
                <Field className="space-y-4 pt-2">
                  {/* 5. Dùng Custom <Button> thay vì thẻ <button> */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                  </Button>

                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                      Sign up
                    </a>
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
