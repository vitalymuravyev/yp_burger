import React, { FC } from "react";

import styles from './modal-overlay.module.css';

type TModalOverlay = {
  onCloseClick: () => void;
}

export const ModalOverlay: FC<TModalOverlay> = ({ onCloseClick }) => {
  return (
    <div className={styles.overlay} onClick={onCloseClick} />
  );
};
