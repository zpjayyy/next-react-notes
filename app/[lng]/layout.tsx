import "./globals.css";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { locales } from "@/config";

export async function generateStaticParams() {
  return locales.map((value) => ({ value }));
}

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng: string;
  };
}>) {
  return (
    <html lang={lng}>
      <body>
        <div>
          <div className="flex h-screen w-full overflow-hidden bg-gray-100">
            <Sidebar />
            <section className="h-full w-full flex justify-center items-center bg-white rounded-xl m-8">
              {children}
            </section>
          </div>
        </div>
      </body>
    </html>
  );
}
