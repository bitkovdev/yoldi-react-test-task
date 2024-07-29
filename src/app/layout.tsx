import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./index.scss"
import { AppHeader } from "@/widgets/header"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yoldi - Тестовое задание",
  description: "Тестовое задание на позицию React (Next.js) разработчика.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader />
        <div className={"wrapper"}>{children}</div>
      </body>
    </html>
  )
}
