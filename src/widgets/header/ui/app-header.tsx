"use client"

import Image from "next/image"
import styles from "./app-header.module.scss"
import clsx from "clsx"
import { Button } from "@/shared/ui/Button"

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
            {user.avatarId ? (
              <Image
                src={process.env.IMAGE_URL + user.avatarId}
                alt={user.name}
                className={styles.avatar}
                width={50}
                height={50}
              />
            ) : (
              <div className={styles.avatarDefault}>
                <span className="subtitle">{user.name.charAt(0)}</span>
              </div>
            )}
          </div>
        ) : (
          <Button onClick={onClickLogin} label="Войти" styleType="secondary" />
        )}
      </div>
    </div>
  )
}
