"use client"

import Image from "next/image"
import styles from "./appHeader.module.scss"
import clsx from "clsx"
import { Button } from "@/shared/ui/Button"
import { Avatar } from "@/shared/ui/Avatar/ui/avatar"
import { useRouter } from "next/navigation"

interface IAppHeaderProps {
  user?: {
    name: string
    avatarId?: string
  }
}

export const AppHeader = ({ user }: IAppHeaderProps) => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.brand} onClick={() => router.push("/")}>
        <Image
          src="/yoldi-logo.svg"
          alt="Yoldi"
          width={80}
          height={50}
          priority
        />
        <p className={clsx("paragraph", styles.brandText)}>
          Разрабатываем и запускаем сложные веб проекты
        </p>
      </div>
      <div className={styles.userInfo}>
        {user ? (
          <div className={styles.userInfoContent}>
            <h3 className={clsx("paragraph", styles.userName)}>{user.name}</h3>
            <Avatar name={"d"} avatarId={""} />
          </div>
        ) : (
          <Button
            onClick={() => router.push("/login")}
            label="Войти"
            styleType="secondary"
          />
        )}
      </div>
    </div>
  )
}
