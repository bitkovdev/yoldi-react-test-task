import { createEvent, createStore } from "effector"
import { persist } from "effector-storage/session"

export const setToken = createEvent<string>()
export const resetToken = createEvent()
export const $AccessToken = createStore("")
  .on(setToken, (_state, payload) => payload)
  .reset(resetToken)

persist({ store: $AccessToken, key: "AccessToken" })
