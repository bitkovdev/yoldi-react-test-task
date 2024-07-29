import { createEffect } from "effector"
import axiosInstance from "@/shared/lib/axios"
import * as Types from "@/shared/api/types"

export const fetchGetUsers = createEffect<
  Types.RequestFetchGetUsers,
  Types.ProfileDto[],
  Types.ErrorData
>(async () => {
  return await axiosInstance.get("/user")
})

export const fetchLoginUser = createEffect<
  Types.RequestFetchLoginUser,
  Types.ApiKeyDto,
  Types.ErrorData
>(async ({ ...rest }) => {
  return await axiosInstance.post("/auth/login", rest)
})

export const fetchSignUpUser = createEffect<
  Types.RequestFetchSignUpUser,
  Types.ApiKeyDto,
  Types.ErrorData
>(async ({ ...rest }) => {
  return await axiosInstance.post("/auth/sign-up", rest)
})

export const fetchGetProfile = createEffect<
  Types.RequestFetchGetProfile,
  Types.ProfileDto,
  Types.ErrorData
>(async () => {
  return await axiosInstance.get("/profile")
})
