import { createForm, Form } from "effector-forms"
import { sample } from "effector"
import { fetchUpdateProfile } from "@/shared/api/requests"

const UserPageForm: Form<{
  slug: string
  coverId: string
  email: string
  name: string
  description: string
  imageId: string
}> = createForm({
  fields: {
    name: {
      init: "",
    },
    slug: {
      init: "",
    },
    email: {
      init: "",
    },
    description: {
      init: "",
    },
    coverId: {
      init: "",
    },
    imageId: {
      init: "",
    },
  },
})

export default UserPageForm

sample({
  clock: UserPageForm.submit,
  source: UserPageForm.$values,
  filter: UserPageForm.$isValid,
  fn: data => ({
    name: data.name,
    email: data.email,
    slug: data.slug,
    description: data.description === "" ? null : data.description,
    imageId: data.imageId === "" ? null : data.imageId,
    coverId: data.coverId === "" ? null : data.coverId,
  }),
  target: fetchUpdateProfile,
})
