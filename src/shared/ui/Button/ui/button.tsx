"use client"

import styles from "./button.module.scss"
import { ButtonHTMLAttributes, ReactNode } from "react"
import clsx from "clsx"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: "primary" | "secondary"
  label: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export const Button = (props: IButtonProps) => {
  const {
    styleType = "primary",
    label,
    iconLeft,
    iconRight,
    className,
    ...rest
  } = props

  const stylesObject = {
    primary: styles.primaryStyle,
    secondary: styles.secondaryStyle,
  }

  return (
    <button className={clsx(className, stylesObject[styleType])} {...rest}>
      {iconLeft}
      <span className="button-text">{label}</span>
      {iconRight}
    </button>
  )
}
