import { Rule } from "effector-forms"

export const RequiredValidator: Rule<string | number> = {
  name: "requiredValidator",
  validator: val => {
    return !!val
  },
  errorText: "Поле обязательно",
}

export const EmailValidator: Rule<string> = {
  name: "emailValidator",
  validator: val => (val !== "" ? /\S+@\S+\.\S+/.test(val) : true),
  errorText: "Введеная электронная почта некорректна",
}
