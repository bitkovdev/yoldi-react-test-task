import styles from "./profileBanner.module.scss"
import { IMAGE_URL } from "@/shared/config/env"
import Image from "next/image"
import { Button } from "@/shared/ui/Button"
import { ButtonImageIcon, TrashSolidIcon, UploadSolidIcon } from "@/shared/svg"
import { useRef } from "react"
import { fetchLoadImage } from "@/shared/api/requests"

interface IProfileBannerProps {
  bannerId?: string
  onAddBanner: (bannerId: string) => void
  onRemoveBanner: () => void
  editable?: boolean
}

export const ProfileBanner = (props: IProfileBannerProps) => {
  const { bannerId, onRemoveBanner, onAddBanner, editable } = props
  const ref = useRef<HTMLInputElement>(null)

  const fileChosen = async () => {
    if (ref.current?.files?.item(0) !== undefined) {
      const res = await fetchLoadImage({ file: ref.current?.files?.item(0) })
      console.log(res)
      onAddBanner(res.id)
    }
  }

  return (
    <div data-editable={editable} className={styles.container}>
      {editable && (
        <div className={styles.bannerImageUpload}>
          <Button
            label={bannerId ? "Удалить" : "Загрузить"}
            styleType="secondary"
            onClick={() =>
              !bannerId ? ref.current?.click() : onRemoveBanner()
            }
            iconLeft={bannerId ? <TrashSolidIcon /> : <UploadSolidIcon />}
            iconRight={<ButtonImageIcon />}
            className={styles.button}
          />
          <input
            className={styles.input}
            onChange={fileChosen}
            ref={ref}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
      )}
      {bannerId ? (
        <Image
          src={IMAGE_URL + bannerId}
          className={styles.bannerImage}
          width={0}
          height={0}
          sizes="100%"
          alt={bannerId}
        />
      ) : (
        <div className={styles.bannerImageEmpty} />
      )}
    </div>
  )
}
