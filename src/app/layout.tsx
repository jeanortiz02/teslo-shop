import type { Metadata } from "next";

import { geistSans } from "@/config/fonts";
import "./globals.css";



export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop '
  },
  description: "Is a E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
