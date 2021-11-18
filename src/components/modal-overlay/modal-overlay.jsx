import React, {useCallback, useEffect} from "react";
import PropTypes from "prop-types";

import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ children, onCloseClick }) => {

  const handleEscPress = useCallback((evt) => {
    if (evt.key === 'Escape') {
      onCloseClick();
    }
  }, [onCloseClick]);

  useEffect(() => {
    document.addEventListener('keydown', (evt) => handleEscPress(evt));
    return (
      document.removeEventListener('keydown', handleEscPress)
    )
  }, [handleEscPress])

  return (
    <div className={styles.overlay} onClick={onCloseClick}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.any,
  onCloseClick: PropTypes.func.isRequired
}
