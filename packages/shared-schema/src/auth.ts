import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email không được để trống" })
    .email("Email không hợp lệ")
    .trim(),

  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email không được để trống" })
      .email("Email không hợp lệ")
      .trim(),

    name: z.string().min(1, { message: "Tên không được để trống" }),

    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),

    confirmPassword: z.string().min(6, {
      message: "Mật khẩu xác nhận phải có ít nhất 6 ký tự",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
  });

export type RegisterType = z.infer<typeof RegisterSchema>;

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Mật khẩu hiện tại phải có ít nhất 6 ký tự" }),

    newPassword: z
      .string()
      .min(6, { message: "Mật khẩu mới phải có ít nhất 6 ký tự" }),

    confirmPassword: z.string().min(6, {
      message: "Mật khẩu xác nhận phải có ít nhất 6 ký tự",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

