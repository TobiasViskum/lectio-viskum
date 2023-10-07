import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./_components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { SidebarWrapper } from "./_components/SidebarWrapper";
import { CacheResetter } from "./_components/CacheResetter";
import { revalidatePath } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lectio",
  description: "Made by Tobias T. Viskum",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "overflow-x-hidden overflow-y-auto flex flex-col items-center")}>
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          <Navbar />
          <div className="py-16 w-full">
            <SidebarWrapper>
              <main className="w-full px-4 max-w-4xl">{children}</main>
            </SidebarWrapper>
          </div>
        </ThemeProvider>
        {/* <CacheResetter /> */}
      </body>
    </html>
  );
}
