"use client"

import Image from "next/image"
import styles from "./appHeader.module.scss"
import clsx from "clsx"
import { Button } from "@/shared/ui/Button"
import { Avatar } from "@/shared/ui/Avatar/ui/avatar"
import { useRouter } from "next/navigation"
import { useUnit } from "effector-react/effector-react.umd"
import { TokenModel } from "@/entities/token"
import { useEffect } from "react"
import { fetchGetProfile } from "@/shared/api/requests"
import { ProfileModel } from "@/entities/profile"

export const AppHeader = () => {
  const router = useRouter()
  const token = useUnit(TokenModel.$AccessToken)
  const profileData = useUnit(ProfileModel.$ProfileData)

  useEffect(() => {
    if (token) {
      fetchGetProfile({})
    }
  }, [token])

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
      {profileData.name ? (
        <div
          className={styles.userInfoContent}
          onClick={() => router.push(`/user/${profileData.slug}`)}
        >
          <h3 className={clsx("paragraph", styles.userName)}>
            {profileData.name}
          </h3>
          <Avatar name={profileData.name} avatarId={profileData.image?.id} />
        </div>
      ) : (
        <Button
          onClick={() => router.push("/login")}
          label="Войти"
          styleType="secondary"
        />
      )}
    </div>
  )
}
