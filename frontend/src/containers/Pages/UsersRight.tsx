// ここではusers一覧を表示します。GET: /usersに反応
import React, { useReducer, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers } from "../../apis/users";
import { fetchLogoutUser } from "../../apis/users_logout";
import { User } from "../../interfaces";
import { UserContext } from "../../providers/UserProvider";

import {
  initialState,
  usersActionTypes,
  usersReducer,
} from '../../reducers/users';
import { Header } from "../Templetes/Header";

export const UsersRight = (props:any) => {

  const current_user = useContext(UserContext);
  console.log(current_user);

const navigate = useNavigate();
  const [state, dispatch] = useReducer(usersReducer, initialState);

  
  useEffect(() => {
    dispatch({ type: usersActionTypes.FETCHING });
    if (!current_user.currentUserInfo?.data?.user.id) return;
    fetchUsers(current_user.currentUserInfo?.data.user.id)
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


  
//認可処理
useEffect(()=>{
  if (localStorage.getItem("current_user") == null) {
    navigate('/login')
  }
},[])

  console.log(state)
  return (

    
  <>
  

   {
      state.usersList.map((user: User) =>{
        if(user.id !== current_user.currentUserInfo?.data?.user.id){
          return(
        <div key={user.id} className="flex  m-5">
    

          <Link className="" to={`/users/${user.id}`}><img className="rounded-full" src={user.profile_image?.url ? (user.profile_image?.url) : ("../icon/kkrn_icon_user_3.png")} width={30} height={30} /></Link>
          <Link className="mt-[1px]" to={`${user.id}`}><p>{user.name}</p></Link>
     
  
          {/* <Link to={`${user.id}/edit/`}>編集</Link> */}
        </div>
          )
        }
      }
      )
    }

    </>
  )
};
