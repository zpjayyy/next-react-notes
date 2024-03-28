import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
