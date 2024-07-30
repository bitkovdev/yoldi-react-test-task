import { createForm, Form } from "effector-forms"
import { EmailValidator, RequiredValidator } from "@/shared/lib/validators"
import { restore, sample } from "effector"
import { fetchSignUpUser } from "@/shared/api/requests"
import { TokenModel } from "@/entities/token"

const SignUpPageForm: Form<{
  email: string
  name: string
  password: string
}> = createForm({
  fields: {
    name: {
      init: "",
      rules: [RequiredValidator],
    },
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

export default SignUpPageForm

sample({
  clock: SignUpPageForm.submit,
  source: SignUpPageForm.$values,
  filter: SignUpPageForm.$isValid,
  fn: data => ({
    email: data.email,
    password: data.password,
    name: data.name,
  }),
  target: fetchSignUpUser,
})

sample({
  clock: fetchSignUpUser.doneData,
  fn: data => data.value,
  target: [TokenModel.setToken, SignUpPageForm.reset],
})

export const $SignUpFormFailData = restore(fetchSignUpUser.failData, {
  statusCode: 0,
  error: "",
  message: "",
}).reset(fetchSignUpUser.doneData)
