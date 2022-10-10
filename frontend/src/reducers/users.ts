import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  usersList: [],
};

export const usersActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

type State = {
  fetchState: string;
  usersList: Array<object>
}

type Action = {
  type: string;
  payload?: any;
}


export const usersReducer = (state: State, action: Action) => {
  switch (action.type) {
    case usersActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case usersActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        usersList: action.payload.users
      };
    default:
      throw new Error();
  }
}
