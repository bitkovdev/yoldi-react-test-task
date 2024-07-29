import styles from "./loginPage.module.scss"
import Link from "next/link"
import clsx from "clsx"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { EmailIcon, PasswordIcon } from "@/shared/svg"
import { useForm } from "effector-forms"
import { LoginPageForm, $LoginFormFailData } from "@/pages/LoginPage/model"
import { useUnit } from "effector-react"
import { TokenModel } from "@/entities/token"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const { fields, values, isValid, submit } = useForm(LoginPageForm)
  const router = useRouter()
  const token = useUnit(TokenModel.$AccessToken)
  const errorMessage = useUnit($LoginFormFailData)

  useEffect(() => {
    if (token) {
      router.push("/")
    }
  }, [token])

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.card}>
          <h1 className="title">Вход в Yoldi Agency</h1>
          <div className={styles.inputs}>
            <Input
              name="email"
              icon={<EmailIcon />}
              value={values.email}
              onChange={e => fields.email.onChange(e.target.value)}
              errorText={fields.email.firstError?.errorText}
              error={errorMessage.message !== ""}
              placeholder="E-mail"
              type="email"
            />
            <Input
              name="password"
              value={values.password}
              icon={<PasswordIcon />}
              errorText={
                fields.password.firstError?.errorText || errorMessage.message
              }
              onChange={e => fields.password.onChange(e.target.value)}
              placeholder="Пароль"
              type="password"
            />
          </div>
          <Button
            className={styles.button}
            disabled={values.email === "" || values.password === "" || !isValid}
            onClick={() => submit()}
            label="Войти"
          />
        </div>
      </div>
      <div className={styles.footer}>
        <h3 className={clsx("paragraph", styles.footerText)}>
          Еще нет аккаунта?{" "}
          <Link
            className={clsx("button-text", styles.footerLink)}
            href="/signup"
          >
            Зарегистрироваться
          </Link>
        </h3>
      </div>
    </>
  )
}

export default LoginPage
