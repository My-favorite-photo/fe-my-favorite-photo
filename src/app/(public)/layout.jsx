import Header from "@/components/common/header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}