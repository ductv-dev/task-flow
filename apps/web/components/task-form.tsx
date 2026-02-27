"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskSchema, UpdateTaskSchema } from "@workspace/shared-schema";
import z from "zod";
import { createTaskAction, updateTaskAction } from "@/actions/task.action";
import { toast } from "@workspace/ui/components/sonner";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field";
import { Task } from "./task-card";

interface TaskFormProps {
    initialData?: Task;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const TaskForm = ({ initialData, onSuccess, onCancel }: TaskFormProps) => {
    const isEditing = !!initialData;
    const Schema = isEditing ? UpdateTaskSchema : CreateTaskSchema;

    type FormValues = z.infer<typeof Schema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(Schema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            ...(isEditing && { completed: initialData.completed }),
        },
    });

    const onSubmit = async (data: FormValues) => {
        let result;
        if (isEditing) {
            result = await updateTaskAction(initialData.id, data as any);
        } else {
            result = await createTaskAction(data as any);
        }

        if (result.error) {
            toast.error(result.error);
            form.setError("root", { message: result.error });
            return;
        }

        toast.success(isEditing ? "Đã cập nhật công việc" : "Đã tạo công việc mới");
        if (onSuccess) onSuccess();
        if (!isEditing) form.reset();
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FieldGroup className="flex flex-col gap-4">
                {form.formState.errors.root && (
                    <p className="text-sm text-red-500 text-center">
                        {form.formState.errors.root.message}
                    </p>
                )}

                <Field>
                    <FieldLabel htmlFor="title">Tiêu đề</FieldLabel>
                    <Input
                        id="title"
                        {...form.register("title")}
                        placeholder="Làm bài tập cuối khóa..."
                        className={`w-full transition-colors ${form.formState.errors.title ? "border-red-500 focus-visible:ring-red-500" : ""
                            }`}
                    />
                    {form.formState.errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                            {form.formState.errors.title.message as string}
                        </p>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="description">Mô tả (Tùy chọn)</FieldLabel>
                    <Textarea
                        id="description"
                        {...form.register("description")}
                        placeholder="Chi tiết công việc cần làm..."
                        className="resize-none min-h-[100px]"
                    />
                    {form.formState.errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                            {form.formState.errors.description.message as string}
                        </p>
                    )}
                </Field>

                <div className="flex justify-end gap-3 pt-4">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={form.formState.isSubmitting}
                        >
                            Hủy
                        </Button>
                    )}
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting
                            ? "Đang lưu..."
                            : isEditing
                                ? "Cập nhật"
                                : "Tạo mới"}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
};
