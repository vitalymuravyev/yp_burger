import React, {useCallback, useEffect} from "react";
import ReactDOM from "react-dom";

import styles from './modal.module.css';
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const container = document.getElementById('modal-root');

export const Modal = ({closeModal, children }) => {

  const handleEscPress = useCallback((evt) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    document.addEventListener('keydown', (evt) => handleEscPress(evt));
    return (
      document.removeEventListener('keydown', handleEscPress)
    )
  }, [handleEscPress])

  return ReactDOM.createPortal(
    <>
      <div className={`p-10 ${styles.wrapper}`}>
        <span className={styles.closeButton} onClick={closeModal}>
          <CloseIcon type="primary" />
        </span>
        {children}
      </div>
      <ModalOverlay onCloseClick={closeModal}/>
    </>,
    container
  )
}
