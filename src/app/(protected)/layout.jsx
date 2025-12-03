"use client"
import { usePathname } from "next/navigation";

import Header from "@/components/common/header/Header";

export default function Layout({ children }) {
  const pathname = usePathname();
  const isCompletePage = pathname.endsWith('/complete')

  return (
    <>
      {!isCompletePage && <Header />}
      {children}
    </>
  )
}
