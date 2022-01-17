import React, { useCallback, useEffect, FC } from "react";
import ReactDOM from "react-dom";

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css';
import {ModalOverlay} from "../modal-overlay/modal-overlay";

const container = document.getElementById('modal-root') as HTMLElement;

type TModal = {
  closeModal: () => void
}

export const Modal: FC<TModal> = ({closeModal, children }) => {

  const handleEscPress = useCallback((evt) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    return (
      () => document.removeEventListener('keydown', handleEscPress)
    );
  }, [handleEscPress]);

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
  );
};
