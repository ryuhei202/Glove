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

export const Users = (props:any) => {

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
  }, [current_user])


  
//認可処理
useEffect(()=>{
  if (localStorage.getItem("current_user") == null) {
    navigate('/login')
  }
},[])

  console.log(state)
  return (

    
  <>
   <Header>ユーザー一覧ページです</Header>
   <div className="mb-3 mt-10 mx-5 p-3 border  border-sky-400  rounded-3xl fixed top-28 right-0 left-0 md:right-1/4 md:left-1/4 h-3/4  overflow-auto">
   <div className="mx-6 mt-10">
      <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">Users.</h2>
    </div>
   {
      state.usersList.map((user: User) =>{
        if(user.id !== current_user.currentUserInfo?.data?.user.id){
          return(
            
            
        <div key={user.id} className="mx-6 mt-10">
          <Link className="" to={`/users/${user.id}`}>
            <img className="rounded-full" src={user.profile_image?.url ? (user.profile_image?.url) : ("../icon/kkrn_icon_user_3.png")} width={30} height={30} />
          </Link>
          <Link className="mt-[1px]" to={`${user.id}`}><p>{user.name}</p></Link>
        </div>

        
          )
        }
      }
      )
    }
    </div>

    </>
  )
};
