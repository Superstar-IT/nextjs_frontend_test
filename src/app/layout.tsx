import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import SidebarBreadcrumbs from "@/components/sidebar/sidebar-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { PROJECT_CONFIG } from "@/config/project-config";

import "./globals.css";
import { ReactQueryProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: PROJECT_CONFIG.name,
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="dark" lang="en">
      <ToastProvider>
        <body className={`${inter.className} min-h-screen`}>
          <main className="bg-sidebar">
            <ReactQueryProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="m-2 mx-auto max-w-screen-2xl md:rounded-xl md:border">
                  <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                      <Separator orientation="vertical" className="mr-2 h-4" />
                      <SidebarBreadcrumbs />
                    </div>
                  </header>
                  <div className="p-4 pt-0">{children}</div>
                </SidebarInset>
              </SidebarProvider>
              <Toaster />
            </ReactQueryProvider>
          </main>
        </body>
      </ToastProvider>
    </html>
  );
}
