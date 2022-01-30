import React, { FC } from "react";

import {useSelector} from '../../utils/helpers';
import {Modal} from "../modal/modal";

import { ORDER_DATA } from "../../utils/constants";

type TOrderDetails = {
  closeModal: () => void
}

export const OrderDetails: FC<TOrderDetails> = ({ closeModal }) => {
  const { id } = useSelector(state => state.orderDetails);
  return (
    <Modal closeModal={closeModal}>
      <p className="text text_type_digits-large mt-20">{id}</p>
      <p className="text text_type_main-medium mt-8">
        идентификатор заказа
      </p>
      <img src="done.gif" alt="Картинка принятия заказа" height="120px" width="120px"  className="mt-15" />
      <p className="text text_type_main-default mt-15">
        {ORDER_DATA.status}
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-20">
        {ORDER_DATA.text}
      </p>
    </Modal>
  );
};
