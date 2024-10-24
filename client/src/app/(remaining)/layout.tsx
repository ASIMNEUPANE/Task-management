import type { Metadata } from "next";
import "../globals.css";

import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import TanstackProvider from "@/providers/TanstackProvider";


export const metadata: Metadata = {
  title: "Task Application",
  description: "Its a full stack app build on next js && nest js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className="bg-green-300ay-700" >
        <TanstackProvider>
    <Navbar />
    {children }
{/* {<Footer/>} */}
  </TanstackProvider>
        </body>
    </html>
  );
}
