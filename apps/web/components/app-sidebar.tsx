"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import {
  CalendarIcon,
  ListTodoIcon,
  CheckCircle2Icon,
  CheckSquareIcon
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Hôm nay",
      url: "/dashboard?filter=today",
      icon: <CalendarIcon />,
    },
    {
      title: "Tất cả công việc",
      url: "/dashboard",
      icon: <ListTodoIcon />,
    },
    {
      title: "Đã hoàn thành",
      url: "/dashboard?filter=completed",
      icon: <CheckCircle2Icon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 border-b px-4 flex items-center justify-center">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CheckSquareIcon className="size-5" />
          </div>
          <span className="text-lg tracking-tight group-data-[collapsible=icon]:hidden">
            TaskFlow
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
