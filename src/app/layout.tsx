import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./_components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { SidebarWrapper } from "./_components/SidebarWrapper";
import { Toaster } from "sonner";
import { MainClientHandler } from "./_components/MainClientHandler";
import { KeyHandler } from "./_components/KeyHandler";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lectio",
  description: "Made by Tobias T. Viskum",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      </head>
      <body className={cn(inter.className, "overflow-x-hidden overflow-y-auto flex flex-col items-center")}>
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          <Toaster richColors />
          <Navbar />
          <div className="py-16 w-full">
            <main className="w-full px-4 flex flex-col items-center">{children}</main>
          </div>
        </ThemeProvider>
        <MainClientHandler />
        <KeyHandler />
      </body>
    </html>
  );
}
