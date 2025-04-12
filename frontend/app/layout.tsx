import type { Metadata } from "next";
import { Poppins, Kanit } from "next/font/google";
import "./globals.css";
import { NavHeader } from "@/components/nav/NavHeader";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const kanit = Kanit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LOOK LOOK - แอปพลิเคชัน AI ที่รู้ใจลูก ๆ สัตว์เลี้ยงของคุณ!",
  description: "แอปพลิเคชัน AI ที่รู้ใจลูก ๆ สัตว์เลี้ยงของคุณ!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${kanit.variable} font-body antialiased`}
      >
        <NavHeader />
        <main className="mx-auto max-w-7xl">{children}</main>
      </body>
    </html>
  );
}
