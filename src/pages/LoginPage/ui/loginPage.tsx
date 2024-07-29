import styles from "./loginPage.module.scss"
import Link from "next/link"
import clsx from "clsx"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { EmailIcon, PasswordIcon } from "@/shared/svg"

const LoginPage = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.card}>
          <h1 className="title">Вход в Yoldi Agency</h1>
          <div className={styles.inputs}>
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
          <Button className={styles.button} label="Войти" />
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
