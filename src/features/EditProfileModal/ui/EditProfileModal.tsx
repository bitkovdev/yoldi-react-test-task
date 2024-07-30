import styles from "./EditProfileModal.module.scss"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import clsx from "clsx"
import { useForm } from "effector-forms"
import EditProfileForm from "@/features/EditProfileModal/model/form"
import { events } from "@/entities/modal"
import { useEffect } from "react"

interface IEditProfileModalValues {
  name: string
  slug: string
  description: string
}

interface IEditProfileModalProps {
  valuesModal: IEditProfileModalValues
  onSubmit: (values: IEditProfileModalValues) => void
}

export const EditProfileModal = ({
  valuesModal,
  onSubmit,
}: IEditProfileModalProps) => {
  const { values, fields, reset, isValid, setForm, submit } =
    useForm(EditProfileForm)

  useEffect(() => {
    setForm(valuesModal)
  }, [valuesModal])

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <h1 className="title">Редактировать профиль</h1>
        <div className={styles.inputs}>
          <Input
            value={values.name}
            errorText={fields?.name.firstError?.errorText}
            onChange={event => fields.name.onChange(event.target.value)}
            name="name"
            label="Имя"
          />
          <div className={styles.input}>
            <h3 className={clsx(styles.titleInput, "button-text")}>
              Адрес профиля
            </h3>
            <div
              className={styles.InputSlagContainer}
              data-error={fields.slug.firstError?.errorText !== undefined}
            >
              <div className={styles.InputSlagContainerDomain}>
                <h3 className="paragraph">{location.host + "/user/"}</h3>
              </div>
              <input
                value={values.slug}
                onChange={event => fields.slug.onChange(event.target.value)}
                className={styles.inputSlagMain}
              />
            </div>
            <h3 className={clsx(styles.errorText, "paragraph-mini")}>
              {fields.slug.firstError?.errorText}
            </h3>
          </div>
          <div className={styles.input}>
            <h3 className={clsx(styles.titleInput, "button-text")}>Описание</h3>
            <textarea
              className={styles.textArea}
              value={values.description}
              onChange={event =>
                fields.description.onChange(event.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          label="Отменить"
          onClick={() => {
            events.closeModal()
            reset()
          }}
          styleType="secondary"
        />
        <Button
          label="Сохранить"
          onClick={async () => {
            submit()
            if (isValid) {
              onSubmit(values)
              events.closeModal()
              reset()
            }
          }}
          styleType="primary"
        />
      </div>
    </div>
  )
}
