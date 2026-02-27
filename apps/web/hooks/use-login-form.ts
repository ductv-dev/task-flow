// src/features/auth/hooks/useLoginForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@workspace/shared-schema";
import z from "zod";
import { loginAction } from "../actions/login.action";

import { toast } from "@workspace/ui/components/sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

type LoginFormValues = z.infer<typeof LoginSchema>;

export const useLoginForm = () => {
  const router = useRouter();
  const loginToStore = useAuthStore((state: { login: any }) => state.login);

  // 1. Khởi tạo form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  // 2. Logic xử lý Submit
  const onSubmit = async (data: LoginFormValues) => {
    const result = await loginAction(data);

    if (result.error) {
      toast.error(result.error);
      form.setError("password", { message: result.error });
      return;
    }

    if (result.success && result.user) {
      loginToStore(result.user);
      toast.success("Đăng nhập thành công!");
      router.push("/");
    }
  };

  // 3. Chỉ trả ra những gì UI cần
  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
};
