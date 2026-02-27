import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { toast, Toaster } from "@workspace/ui/components/sonner";
import { getMeAction } from "@/actions/get-me-action";
import { AuthProvider } from "./providers/auth-provider";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMeAction();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <AuthProvider user={user}>{children}</AuthProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
