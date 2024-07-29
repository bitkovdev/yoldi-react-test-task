import Image from "next/image"
import styles from "./avatar.module.scss"
import { IMAGE_URL } from "@/shared/config/env"

interface IAvatarProps {
  avatarId?: string
  name: string
}

export const Avatar = ({ avatarId, name }: IAvatarProps) => {
  return (
    <>
      {avatarId ? (
        <Image
          src={IMAGE_URL + avatarId}
          alt={name}
          className={styles.avatar}
          width={50}
          height={50}
        />
      ) : (
        <div className={styles.avatarDefault}>
          <span className="subtitle">{name.charAt(0)}</span>
        </div>
      )}
    </>
  )
}
