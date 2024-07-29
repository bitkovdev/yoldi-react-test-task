import { restore } from "effector"
import { fetchGetProfile } from "@/shared/api/requests"

export const $ProfileData = restore(fetchGetProfile.doneData, {
  name: "",
  email: "",
  slug: "",
  description: "",
})
