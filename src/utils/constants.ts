export const API_URL = 'https://norma.nomoreparties.space/api';
export const WS_API_URL = 'wss://norma.nomoreparties.space/orders';
export const ERROR_MESSAGE = 'Что-то пошло не так! Перезагрузите страницу';

export const ERROR_MESSAGE_ORDER = 'К сожалению не удалось оформить заказ. Попробуйте чуть позже';
export const EMPTY_ORDER = 'Пока в вашем бургере ничего нет. Обязательно добавьте побольше всего вкусного';

export const ORDER_DATA = {
  status: 'Ваш заказ начали готовить',
  text: 'Дождитесь готовности на орбитальной станции'
};

// twenty minutes
export const TOKEN_LIFE_TIME = 1 / 72;

export const ingredientTypes = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
};

export const OrderStatus = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан'
};
