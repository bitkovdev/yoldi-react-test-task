import { useUnit } from "effector-react"
import { CSSTransition } from "react-transition-group"
import React, { useEffect, useRef, useState } from "react"
import styles from "./style.module.scss"

import { $currentModal, events } from "@/entities/modal"
import { useOnClickOutside } from "@/shared/lib/hooks/useOnClickOutside"

const TIMEOUT = 200

export const Modal = () => {
  const [show, setShow] = useState(false)
  const [content, setContent] = useState<React.ReactNode>(<></>)

  const ref = useRef<HTMLDivElement>(null)
  const modal = useUnit($currentModal)

  useEffect(() => {
    const keyPressCallback = (event: KeyboardEvent) => {
      event.key === "Escape" && events.closeModal()
    }

    document.addEventListener("keydown", keyPressCallback)

    return () => document.removeEventListener("keydown", keyPressCallback)
  }, [])

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        events.closeModal()
        setContent(<></>)
      }, TIMEOUT)
    }
  }, [show])

  useEffect(() => {
    setShow(modal !== null)
    if (modal) {
      setContent(modal.component)
    }
  }, [modal])

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      (event.target as HTMLDivElement).className?.includes("modal__overlay")
    ) {
      modal?.onClose && modal.onClose()
      events.closeModal()
    }
  }

  useOnClickOutside(ref, () => {
    modal?.onClose && modal.onClose()
    events.closeModal()
  })

  return (
    <CSSTransition
      in={show}
      timeout={TIMEOUT}
      classNames="modal-transition"
      unmountOnExit
    >
      <div className={styles.wrapper} onMouseDown={handleOverlayClick}>
        <div className={styles.modalBody} ref={ref}>
          {content}
        </div>
      </div>
    </CSSTransition>
  )
}
