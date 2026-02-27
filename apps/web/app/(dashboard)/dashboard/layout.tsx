import { AppSidebar } from "@/components/app-sidebar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebar />
      {children}
    </>
  );
}
