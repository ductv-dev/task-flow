"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Button } from "@workspace/ui/components/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { updateTaskAction, deleteTaskAction } from "@/actions/task.action";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import { toast } from "@workspace/ui/components/sonner";

export interface Task {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const handleToggleCompleted = async (checked: boolean) => {
        setIsUpdatingStatus(true);
        const result = await updateTaskAction(task.id, {
            title: task.title,
            description: task.description || "",
            completed: checked,
        });

        setIsUpdatingStatus(false);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(checked ? "Đã đánh dấu hoàn thành" : "Đã bỏ đánh dấu hoàn thành");
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        const result = await deleteTaskAction(task.id);
        setIsDeleting(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Đã xóa công việc");
        }
    };

    return (
        <Card className={`transition-all hover:shadow-md ${task.completed ? "opacity-75 bg-muted/30" : ""}`}>
            <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-3">
                    <Checkbox
                        checked={task.completed}
                        onCheckedChange={handleToggleCompleted}
                        disabled={isUpdatingStatus}
                        className="mt-1"
                    />
                    <div className="grid gap-1">
                        <CardTitle className={`text-base leading-none ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                            {new Date(task.createdAt).toLocaleDateString("vi-VN")}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-4">
                <p className={`text-sm ${task.completed ? "text-muted-foreground/80 line-through" : "text-muted-foreground"}`}>
                    {task.description || "Không có mô tả"}
                </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-0">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => onEdit(task)}
                    disabled={isDeleting || isUpdatingStatus}
                >
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Sửa</span>
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            disabled={isDeleting || isUpdatingStatus}
                        >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Xóa</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Xóa công việc này?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Hành động này không thể hoàn tác. Công việc sẽ bị xóa vĩnh viễn khỏi hệ thống.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete();
                                }}
                                disabled={isDeleting}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                {isDeleting ? "Đang xóa..." : "Xóa công việc"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
};
