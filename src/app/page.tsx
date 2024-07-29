"use client"

import { AppHeader } from "@/widgets/header"

const Page = () => {
  return <AppHeader onClickLogin={() => console.log("Login")} />
}

export default Page
