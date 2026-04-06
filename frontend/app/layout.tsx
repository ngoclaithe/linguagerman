import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const fontSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "LinguaGerman - Học Tiếng Đức Online",
  description: "Nền tảng học tiếng Đức trực tuyến với khóa học, bài tập, flashcard và đề thi Goethe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased`}
      >
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
