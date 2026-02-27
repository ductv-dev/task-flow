"use client";

import { useState } from "react";
import { Task, TaskCard } from "./task-card";
import { TaskForm } from "./task-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { PlusIcon } from "lucide-react";

interface TaskListProps {
    initialTasks: Task[];
    filter?: string;
}

export const TaskList = ({ initialTasks, filter = "all" }: TaskListProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsDialogOpen(true);
    };

    const handleOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            setEditingTask(undefined);
        }
    };

    const onSuccess = () => {
        setIsDialogOpen(false);
        setEditingTask(undefined);
    };

    const todayDateStr = new Date().toISOString().split("T")[0];

    // Filter tasks based on 'filter' prop
    const filteredTasks = initialTasks.filter((task) => {
        const taskDateStr = new Date(task.createdAt).toISOString().split("T")[0];

        if (filter === "completed") {
            return task.completed === true;
        }

        if (filter === "today") {
            return taskDateStr === todayDateStr && !task.completed;
        }

        // default "all": exclude completed tasks but show everything else
        return !task.completed;
    });

    // Sort tasks: newest first
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Determine empty state message
    let emptyStateMsg = "Bạn chưa có công việc nào.";
    if (filter === "completed") {
        emptyStateMsg = "Bạn chưa hoàn thành công việc nào.";
    } else if (filter === "today") {
        emptyStateMsg = "Hôm nay bạn chưa có công việc nào.";
    }

    // Determine page title
    let titleMsg = "Công việc của bạn";
    if (filter === "completed") titleMsg = "Đã hoàn thành";
    if (filter === "today") titleMsg = "Hôm nay";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">{titleMsg}</h2>
                <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Thêm công việc
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                {editingTask ? "Sửa công việc" : "Thêm công việc mới"}
                            </DialogTitle>
                        </DialogHeader>
                        <TaskForm
                            initialData={editingTask}
                            onSuccess={onSuccess}
                            onCancel={() => handleOpenChange(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {sortedTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center border rounded-xl bg-muted/20 border-dashed">
                    <p className="text-muted-foreground mb-4">{emptyStateMsg}</p>
                    <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                        Tạo công việc ngay
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedTasks.map((task) => (
                        <TaskCard key={task.id} task={task} onEdit={handleEdit} />
                    ))}
                </div>
            )}
        </div>
    );
};
