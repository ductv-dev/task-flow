"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const searchParams = useSearchParams();
  const currentFilter = searchParams?.get("filter") || "all";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Công việc</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // Check if active based on filter param
          let isActive = false;
          if (item.url === "/dashboard" && currentFilter === "all") isActive = true;
          if (item.url === "/dashboard?filter=today" && currentFilter === "today")
            isActive = true;
          if (item.url === "/dashboard?filter=completed" && currentFilter === "completed")
            isActive = true;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                <Link href={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
