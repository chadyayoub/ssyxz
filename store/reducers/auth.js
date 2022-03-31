import {
  LOADMOREARTICLES,
  RELOADARTICLES,
  SEARCHFORARTICLES,
} from '../actions/articles';
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
    case RELOADARTICLES || SEARCHFORARTICLES || LOADMOREARTICLES:
      return {
        ...state,
        token: state.token,
      };
  }
  return initialState;
};

export default authenticate;
