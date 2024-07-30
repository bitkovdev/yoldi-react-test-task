import styles from "./signUpPage.module.scss"
import Link from "next/link"
import clsx from "clsx"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { EmailIcon, PasswordIcon, UserIcon } from "@/shared/svg"
import { useForm } from "effector-forms"
import { useRouter } from "next/navigation"
import { useUnit } from "effector-react"
import { useEffect } from "react"
import { TokenModel } from "@/entities/token"
import SignUpPageForm, {
  $SignUpFormFailData,
} from "../../../entities/signUpPage"

const SignUpPage = () => {
  const { fields, values, isValid, submit } = useForm(SignUpPageForm)
  const router = useRouter()
  const token = useUnit(TokenModel.$AccessToken)
  const errorMessage = useUnit($SignUpFormFailData)

  useEffect(() => {
    if (token) {
      router.push("/")
    }
  }, [token])

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.card}>
          <h1 className="title">
            Регистрация в<br />
            Yoldi Agency
          </h1>
          <div className={styles.inputs}>
            <Input
              name="name"
              value={values.name}
              onChange={e => fields.name.onChange(e.target.value)}
              errorText={fields.name.firstError?.errorText}
              icon={<UserIcon />}
              error={errorMessage.message !== ""}
              placeholder="Имя"
              type="text"
            />
            <Input
              name="email"
              value={values.email}
              onChange={e => fields.email.onChange(e.target.value)}
              errorText={
                fields.email.firstError?.errorText || errorMessage.message
              }
              icon={<EmailIcon />}
              error={errorMessage.message !== ""}
              placeholder="E-mail"
              type="email"
            />
            <Input
              name="password"
              value={values.password}
              onChange={e => fields.password.onChange(e.target.value)}
              errorText={fields.password.firstError?.errorText}
              icon={<PasswordIcon />}
              error={errorMessage.message !== ""}
              placeholder="Пароль"
              type="password"
            />
          </div>
          <Button
            onClick={() => submit()}
            disabled={
              values.email === "" ||
              values.name === "" ||
              values.password === "" ||
              !isValid
            }
            className={styles.button}
            label="Создать аккаунт"
          />
        </div>
      </div>
      <div className={styles.footer}>
        <h3 className={clsx("paragraph", styles.footerText)}>
          Уже есть аккаунт?{" "}
          <Link
            className={clsx("button-text", styles.footerLink)}
            href="/login"
          >
            Войти
          </Link>
        </h3>
      </div>
    </>
  )
}

export default SignUpPage
