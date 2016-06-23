import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  LOGOUT_USER,
  USER_INFO_SUCCESS
} from '../actions/types';

import jwtDecode from 'jwt-decode';

const DETAULT_STATE = {
  authenticated: (localStorage.getItem('laravel_user_token') !== null),
  userinfo: {
    name: null
  }
};

export default function(state = DETAULT_STATE, action) {
  switch (action.type) {
    case USER_INFO_SUCCESS: 
      return {
        ...state,
        userinfo: action.payload.data
      };   
    case AUTH_USER:
      return {
        ...state,
        authenticated: true
      };
    case LOGOUT_USER:
      return {
        ...state,
        authenticated: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      console.log(state);
      return state;
  }
}
