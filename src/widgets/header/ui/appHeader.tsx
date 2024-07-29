"use client"

import Image from "next/image"
import styles from "./appHeader.module.scss"
import clsx from "clsx"
import { Button } from "@/shared/ui/Button"
import { Avatar } from "@/shared/ui/Avatar/ui/avatar"

interface IAppHeaderProps {
  onClickLogin?: () => void
  user?: {
    name: string
    avatarId?: string
  }
}

export const AppHeader = ({ onClickLogin, user }: IAppHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
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
          <Button onClick={onClickLogin} label="Войти" styleType="secondary" />
        )}
      </div>
    </div>
  )
}
