import styles from "./UserPage.module.scss"
import { useParams, useRouter } from "next/navigation"
import { useUnit } from "effector-react"
import { ProfileModel } from "@/entities/profile"
import useSWR from "swr"
import { fetchGetProfile, fetchGetProfileWithSlug } from "@/shared/api/requests"
import { ProfileBanner } from "@/shared/ui/ProfileBanner"
import { useForm } from "effector-forms"
import UserPageForm from "../../../entities/userPage"
import { useEffect } from "react"
import { Avatar } from "@/shared/ui/Avatar/ui/avatar"
import { Button } from "@/shared/ui/Button"
import { PenSolidIcon, SignOutIcon } from "@/shared/svg"
import { TokenModel } from "@/entities/token"
import { events } from "@/entities/modal"
import { EditProfileModal } from "@/features/EditProfileModal"

const UserPage = () => {
  const params = useParams()
  const profileData = useUnit(ProfileModel.$ProfileData)
  const isUserProfile = profileData.slug === params?.slug
  const { fields, values, submit, setForm } = useForm(UserPageForm)
  const router = useRouter()

  const { data, mutate } = useSWR("GetProfileSlug", () =>
    fetchGetProfileWithSlug({ slug: String(params?.slug) }),
  )

  useEffect(() => {
    mutate()
  }, [params?.slug])

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        slug: data.slug,
        email: data.email,
        coverId: data.cover ? data.cover.id : "",
        imageId: data.image ? data.image.id : "",
        description: data.description ? data.description : "",
      })
    }
  }, [data])

  const handleEditProfile = () => {
    events.openModal({
      component: (
        <EditProfileModal
          valuesModal={{
            name: values.name,
            slug: values.slug,
            description: values.description,
          }}
          onSubmit={async values => {
            setForm(values)
            submit()
            if (params?.slug !== values.slug) {
              await fetchGetProfile({})
              router.push(`/user/${values.slug}`)
            }
          }}
        />
      ),
    })
  }

  return (
    <>
      <div className={styles.bannerContainer}>
        <ProfileBanner
          editable={isUserProfile}
          bannerId={values.coverId}
          onAddBanner={bannerId => {
            fields.coverId.onChange(bannerId)
            submit()
          }}
          onRemoveBanner={() => {
            fields.coverId.onChange("")
            submit()
          }}
        />
        <div className={styles.wrapperAvatar}>
          <div className={styles.avatarContainer}>
            <Avatar
              name={values.name}
              editable={isUserProfile}
              onChangeImage={imageId => {
                fields.imageId.onChange(imageId)
                submit()
              }}
              avatarId={values.imageId}
              size="large"
            />
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.nameContainer}>
          <h1 className={"title"}>{values.name}</h1>
          {isUserProfile && (
            <Button
              onClick={() => handleEditProfile()}
              label="Редактировать"
              styleType={"secondary"}
              iconLeft={<PenSolidIcon />}
            />
          )}
        </div>
        <div className={styles.userInfo}>
          <h3 className="paragraph">{values.email}</h3>
          {isUserProfile && (
            <Button
              onClick={() => handleEditProfile()}
              label="Редактировать"
              styleType={"secondary"}
              iconLeft={<PenSolidIcon />}
            />
          )}
          {values.description && (
            <p className="paragraph">{values.description}</p>
          )}
        </div>
        {isUserProfile && (
          <Button
            className={styles.exitButton}
            label="Выйти"
            styleType={"secondary"}
            onClick={() => {
              TokenModel.resetToken()
              router.push("/")
            }}
            iconLeft={<SignOutIcon />}
          />
        )}
      </div>
    </>
  )
}

export default UserPage
