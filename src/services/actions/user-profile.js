import Cookies from "js-cookie";

import { API_URL } from "../../utils/constants";
import { checkResponseStatus } from "../../utils/helpers";

export const USER_PROFILE_REQUEST = 'USER_PROFILE_REQUEST';
export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAILED = 'USER_PROFILE_FAILED';


export const getUserProfile = () => {
  return function (dispatch) {
    dispatch({
      type: USER_PROFILE_REQUEST
    });
    fetch(`${API_URL}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': Cookies.get('accessToken')
      },
    })
      .then(res => checkResponseStatus(res))
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: USER_PROFILE_SUCCESS,
          payload: result
        });
      })
      .catch(() => {
        dispatch({
          type: USER_PROFILE_FAILED
        });
      });
  };
};
