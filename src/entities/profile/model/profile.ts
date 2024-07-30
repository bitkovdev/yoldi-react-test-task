import { restore, sample } from "effector"
import { fetchGetProfile } from "@/shared/api/requests"
import { TokenModel } from "@/entities/token"
import { setToken } from "@/entities/token/model"

sample({
  clock: setToken,
  target: fetchGetProfile,
})

export const $ProfileData = restore(fetchGetProfile.doneData, {
  name: "",
  email: "",
  slug: "",
  description: "",
}).reset(TokenModel.resetToken)
