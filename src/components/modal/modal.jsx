import React from "react";
import ReactDOM from "react-dom";

import styles from './modal.module.css';
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const container = document.getElementById('modal-root');

export const Modal = ({closeModal, children }) => {

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
