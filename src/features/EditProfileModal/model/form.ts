import { createForm } from "effector-forms"
import { RequiredValidator } from "@/shared/lib/validators"

const EditProfileForm = createForm({
  fields: {
    name: {
      init: "",
      rules: [RequiredValidator],
    },
    slug: {
      init: "",
      rules: [RequiredValidator],
    },
    description: {
      init: "",
    },
  },
  validateOn: ["submit", "change"],
})

export default EditProfileForm
