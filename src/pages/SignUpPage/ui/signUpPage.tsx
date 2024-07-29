import styles from "./signUpPage.module.scss"
import Link from "next/link"
import clsx from "clsx"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { EmailIcon, PasswordIcon, UserIcon } from "@/shared/svg"

const SignUpPage = () => {
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
              name="user"
              icon={<UserIcon />}
              placeholder="Имя"
              type="text"
            />
            <Input
              name="email"
              icon={<EmailIcon />}
              placeholder="E-mail"
              type="email"
            />
            <Input
              name="password"
              icon={<PasswordIcon />}
              placeholder="Пароль"
              type="password"
            />
          </div>
          <Button className={styles.button} label="Создать аккаунт" />
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
