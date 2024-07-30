import { createForm } from "effector-forms"
import { EmailValidator, RequiredValidator } from "@/shared/lib/validators"
import { restore, sample } from "effector"
import { fetchLoginUser } from "@/shared/api/requests"
import { TokenModel } from "@/entities/token"

export const LoginPageForm = createForm({
  fields: {
    email: {
      init: "",
      rules: [RequiredValidator, EmailValidator],
    },
    password: {
      init: "",
      rules: [RequiredValidator],
    },
  },
  validateOn: ["submit"],
})

sample({
  clock: LoginPageForm.submit,
  source: LoginPageForm.$values,
  filter: LoginPageForm.$isValid,
  target: fetchLoginUser,
})

sample({
  clock: fetchLoginUser.doneData,
  fn: data => data.value,
  target: [TokenModel.setToken, LoginPageForm.reset],
})

export const $LoginFormFailData = restore(fetchLoginUser.failData, {
  statusCode: 0,
  error: "",
  message: "",
}).reset(fetchLoginUser.doneData)
