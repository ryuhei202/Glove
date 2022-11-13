// ここではusers一覧を表示します。GET: /usersに反応

import React, { useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers } from "../../apis/users";
import { fetchLogoutUser } from "../../apis/users_logout";

import {
  initialState,
  usersActionTypes,
  usersReducer,
} from '../../reducers/users';
import { Header } from "../Templetes/Header";

export const Users = (props:any) => {

  
const navigate = useNavigate();
  const [state, dispatch] = useReducer(usersReducer, initialState);

  
  useEffect(() => {
    dispatch({ type: usersActionTypes.FETCHING });
    fetchUsers()
    .then((data) =>{
      console.log(data);
      dispatch({
        type: usersActionTypes.FETCH_SUCCESS,
        payload: {
          users: data.users
        }
      })
    }
    )
  }, [])
  
  console.log(state)

  return (

    
  <>
   <Header>ユーザー一覧ページです</Header>

    {
      state.usersList.map((user: any) =>
        <div key={user.id}>
          {user.name}
          <Link to={`${user.id}`}>詳細</Link>
          <Link to={`${user.id}/edit/`}>編集</Link>
        </div>
      )
    }
      <br />
    <Link to="/chatrooms">chatroom</Link>

    </>
  )
};
