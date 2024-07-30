import Image from "next/image"
import styles from "./avatar.module.scss"
import { IMAGE_URL } from "@/shared/config/env"
import { useRef } from "react"
import { fetchLoadImage } from "@/shared/api/requests"
import { CameraSolidIcon } from "@/shared/svg"

interface IAvatarProps {
  avatarId?: string
  name: string
  size?: "medium" | "large"
  editable?: boolean
  onChangeImage?: (imageId: string) => void
  onRemove?: () => void
}

export const Avatar = ({
  avatarId,
  name,
  size = "medium",
  editable,
  onChangeImage,
  onRemove,
}: IAvatarProps) => {
  const sizeStyle = {
    medium: styles.avatarDefault,
    large: styles.avatarLarge,
  }

  const ref = useRef<HTMLInputElement>(null)

  const fileChosen = async () => {
    if (ref.current?.files?.item(0) !== undefined) {
      const res = await fetchLoadImage({ file: ref.current?.files?.item(0) })
      console.log(res)
      if (onChangeImage) {
        onChangeImage(res.id)
      }
    }
  }
  return (
    <div className={sizeStyle[size]} data-editable={editable}>
      {editable && (
        <div
          className={styles.changeButton}
          onClick={() =>
            avatarId
              ? onRemove
                ? onRemove()
                : ref?.current?.click()
              : ref?.current?.click()
          }
        >
          <input
            className={styles.input}
            onChange={fileChosen}
            ref={ref}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />
          <CameraSolidIcon />
        </div>
      )}
      {avatarId ? (
        <Image
          src={IMAGE_URL + avatarId}
          alt={name}
          className={styles.avatar}
          width={size === "medium" ? 50 : 100}
          height={size === "medium" ? 50 : 100}
        />
      ) : (
        <span className="subtitle">{name.charAt(0)}</span>
      )}
    </div>
  )
}
