import React from "react";
import PropTypes from "prop-types";

import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ onCloseClick }) => {
  return (
    <div className={styles.overlay} onClick={onCloseClick} />
  );
};

ModalOverlay.propTypes = {
  onCloseClick: PropTypes.func.isRequired
};
