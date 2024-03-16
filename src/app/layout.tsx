import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import styles from "@/app/main.module.css"

const noto = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Web Game",
  description: "일곱가지 웹 게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>  
        <div className={styles.backround}></div>
        {children}
      </body>
    </html>
  );
}
