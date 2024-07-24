import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import AppWrapper from "@/components/AppWrapper";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body
          className={cn(
            " min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <div className=" sm:hidden flex flex-col gap-4 items-center text-center min-h-screen justify-center text-white">
            <h1 className=" font-extrabold text-2xl">
              This app is not supported on mobile devices
            </h1>
            <p>
              This application contains a lot of tables and data representations
              so you need to access it from a desktop view
            </p>
          </div>

          <Toaster
            richColors
            position="top-center"
            theme="dark"
            expand={false}
          />
          <ThemeProvider attribute="class" defaultTheme="dark">
            <AppWrapper>{children}</AppWrapper>
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
