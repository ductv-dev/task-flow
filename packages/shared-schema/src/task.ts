import { z } from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().min(1, "Tiêu đề không được để trống"),
    description: z.string().min(1, "Mô tả không được để trống"),
});

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = z.object({
    title: z.string().min(1, "Tiêu đề không được để trống"),
    description: z.string().min(1, "Mô tả không được để trống"),
    completed: z.boolean(),
});

export type UpdateTaskType = z.infer<typeof UpdateTaskSchema>;
