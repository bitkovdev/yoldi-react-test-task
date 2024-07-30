import { createEvent, createStore } from "effector"

export interface IModal {
  onClose?(): void
  component: JSX.Element
}

const openModal = createEvent<IModal>()
const closeModal = createEvent<void>()
const closeAllModals = createEvent<void>()

export const $modalHistory = createStore<IModal[]>([])
  .on(closeModal, state => state.slice(0, -1))
  .on(closeAllModals, () => [])
  .on(openModal, (state, payload) => {
    return [...state, payload]
  })

export const $currentModal = $modalHistory.map(history =>
  history.length ? history[history.length - 1] : null,
)

const closePage = createEvent<boolean>()
export const $ClosePageStore = createStore<boolean>(false).on(
  closePage,
  (_state, payload) => payload,
)

export const events = {
  closePage,
  openModal,
  closeModal,
  closeAllModals,
}
