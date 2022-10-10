// ここではusers一覧を表示します。GET: /usersに反応

import React, { useReducer, useEffect } from "react";
import { fetchUsers } from "../apis/users";

import {
  initialState,
  usersActionTypes,
  usersReducer,
} from '../reducers/users';

export const Users = () => {

  const [state, dispatch] = useReducer(usersReducer, initialState);

  useEffect(() => {
    dispatch({ type: usersActionTypes.FETCHING });
    fetchUsers()
    .then((data) =>
      dispatch({
        type: usersActionTypes.FETCH_SUCCESS,
        payload: {
          users: data.users
        }
      })
    )
  }, [])
  
  console.log(state)

  return (

    
  <>
    <p>ユーザー一覧ページです</p>
    {
      state.usersList.map((user) =>
        <div key={user.id}>
          {user.name}
        </div>
      )
    }
    </>
  )
};
