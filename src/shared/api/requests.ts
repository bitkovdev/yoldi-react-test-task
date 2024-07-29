import { createEffect } from "effector"
import axiosInstance from "@/shared/lib/axios"
import * as Types from "@/shared/api/types"

export const fetchGetUsers = createEffect<
  Types.RequestFetchGetUsers,
  Types.ProfileDto[]
>(async () => {
  return await axiosInstance.get("/user")
})
