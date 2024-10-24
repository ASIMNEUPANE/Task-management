
import { PrivateRoute } from "@/components/Routes";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <PrivateRoute>
    {children }
    </PrivateRoute>
    </>
  )  
}
