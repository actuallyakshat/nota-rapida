import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import { GlobalProvider } from "@/providers/global-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nota Rapida",
  description: "A simpe note taking app to help you organise your life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} h-full min-h-[100dvh]`}>
          <GlobalProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </GlobalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
