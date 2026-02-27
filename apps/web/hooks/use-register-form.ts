import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@workspace/shared-schema";
import z from "zod";
import { registerAction } from "../actions/register.action";
import { toast } from "@workspace/ui/components/sonner";
import { useRouter } from "next/navigation";

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const useRegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", name: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const result = await registerAction(data);

    if (result.error) {
      toast.error(result.error);
      form.setError("root", { message: result.error });
      return;
    }

    if (result.success) {
      toast.success("Đăng ký thành công! Đang chuyển hướng đến đăng nhập...");
      router.push("/auth/login");
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
};
