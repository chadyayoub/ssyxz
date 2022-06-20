import {LOGIN, LOGOUT} from '../actions/auth';
const initialState = {
  token: null,
};

const authenticate = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authenticate;
