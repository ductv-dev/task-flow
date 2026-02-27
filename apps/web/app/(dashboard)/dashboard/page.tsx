import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarInset, SidebarTrigger } from "@workspace/ui/components/sidebar";
import { getTasksAction } from "@/actions/task.action";
import { TaskList } from "@/components/task-list";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const filter = (resolvedParams.filter as string) || "all";

  const tasksResult = await getTasksAction();
  const tasks = tasksResult.success ? tasksResult.data : [];

  let breadcrumbTitle = "Tất cả công việc";
  if (filter === "completed") breadcrumbTitle = "Đã hoàn thành";
  if (filter === "today") breadcrumbTitle = "Hôm nay";

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumbTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-screen flex-1 rounded-xl bg-background border p-6 shadow-sm">
          {!tasksResult.success && tasksResult.error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-6 font-medium">
              Có lỗi xảy ra: {tasksResult.error}
            </div>
          )}

          <TaskList initialTasks={tasks} filter={filter} />
        </div>
      </div>
    </SidebarInset>
  );
}
