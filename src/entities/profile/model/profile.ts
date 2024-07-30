import { restore } from "effector"
import { fetchGetProfile } from "@/shared/api/requests"
import { TokenModel } from "@/entities/token"

export const $ProfileData = restore(fetchGetProfile.doneData, {
  name: "",
  email: "",
  slug: "",
  description: "",
}).reset(TokenModel.resetToken)
