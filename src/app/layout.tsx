import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { MainClientHandler } from "./_components/MainClientHandler";
import { KeyHandler } from "./_components/KeyHandler";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lectio",
  description: "Made by Tobias T. Viskum",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: "no",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={cn(
          inter.className,
          "flex flex-col items-center overflow-y-auto overflow-x-hidden",
        )}
      >
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          <Toaster richColors />

          <div className="w-full py-16">
            <main className="flex w-full flex-col items-center px-1 sm:px-2 md:px-4">
              {children}
            </main>
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && <MainClientHandler />}
        <KeyHandler />
      </body>
    </html>
  );
}
