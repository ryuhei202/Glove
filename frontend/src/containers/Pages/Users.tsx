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

export const Users = (props:any) => {

  
const navigate = useNavigate();
  const [state, dispatch] = useReducer(usersReducer, initialState);

  const handleLogoutClick = () => {
    fetchLogoutUser().then(res => {
      console.log(res)
      props.handleLogout()
      navigate("/")
      
    }).catch(error => {
      console.log(error)
    })
  }

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
    <p>ユーザー一覧ページです</p>
    <h2>ログイン状態: {props.loggedInStatus}</h2>

    {
      state.usersList.map((user: any) =>
        <div key={user.id}>
          {user.name}
          <Link to={`${user.id}`}>詳細</Link>
          <Link to={`${user.id}/edit/`}>編集</Link>
        </div>
      )
    }
    <button onClick={handleLogoutClick}>ログアウトする</button>
    </>
  )
};
