import { InputHTMLAttributes, useState } from "react"
import styles from "./input.module.scss"
import clsx from "clsx"
import { EyeSlashIcon, EyeSolidIcon } from "@/shared/svg"

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorText?: string
  icon?: React.ReactNode
  name: string
}

export const Input = (props: IInputProps) => {
  const { label, errorText, disabled, className, name, icon, type, ...rest } =
    props
  const [hidePassword, setHidePassword] = useState<boolean>(true)

  return (
    <div className={styles.mainContainer}>
      {label && <h3 className={clsx("button-text", styles.label)}>{label}</h3>}
      <label htmlFor={name}>
        <div
          data-disabled={disabled}
          data-error={errorText !== undefined}
          className={clsx(styles.inputContainer, className)}
        >
          {icon}
          <input
            id={name}
            disabled={disabled}
            type={
              type === "password" ? (hidePassword ? "password" : "text") : type
            }
            className={"paragraph"}
            {...rest}
          />
          {type === "password" && (
            <button
              className={styles.hidePassword}
              disabled={disabled}
              onClick={() => setHidePassword(prevState => !prevState)}
            >
              {hidePassword ? <EyeSolidIcon /> : <EyeSlashIcon />}
            </button>
          )}
        </div>
      </label>
      {errorText && (
        <h3 className={clsx("paragraph-mini", styles.errorText)}>
          {errorText}
        </h3>
      )}
    </div>
  )
}
