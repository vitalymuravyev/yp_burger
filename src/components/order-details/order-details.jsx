import React from "react";
import PropTypes from "prop-types";

import {Modal} from "../modal/modal";

const ORDER_DATA = {
  id: '034536',
  status: 'Ваш заказ начали готовить',
  text: 'Дождитесь готовности на орбитальной станции'
}


export const OrderDetails = ({ closeModal }) => {

  return (
    <Modal closeModal={closeModal}>
      <p className="text text_type_digits-large mt-20">{ORDER_DATA.id}</p>
      <p className="text text_type_main-medium mt-8">
        идентификатор заказа
      </p>
      <img src="done.gif" alt="" height="120px" width="120px"  className="mt-15" />
      <p className="text text_type_main-default mt-15">
        {ORDER_DATA.status}
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-20">
        {ORDER_DATA.text}
      </p>
    </Modal>
  )
}

OrderDetails.propTypes = {
  closeModal: PropTypes.func.isRequired
}
