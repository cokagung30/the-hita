// export default function RootLayout({ children } )
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Sesuaikan bobot yang dibutuhkan
  display: "swap", // Untuk loading yang lebih baik
});

export const metadata: Metadata = {
  title: "THE HITA",
  description: "Crafting Home for Everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={plusJakartaSans.className}>
        {children}
      </body>
    </html>
  );
}
