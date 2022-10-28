// import { match } from "assert";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsersShow } from "../apis/users_id";
import { fetchUserDelete } from "../apis/user_delete";


type Userstype = {
  created_at: string;
  email: string;
  gender: string;
  id: number;
  name: string;
  password_digest: string;
  profile_image: string;
  self_introduction: string;
  updated_at: string;
}




export const UsersShow = (props:any) => {

  const navigate = useNavigate();



  const [state, setState] = useState<Userstype | null>(null);

  const  { id } = useParams<{ id: any }>();

//編集ボタンを押した際のアクション
  const onClickEdit = () => {
    navigate('edit', {state: id})
  }

  //消去ボタンを押した際のアクション
  const onClickDelete = () => {
    //deleteリクエスト
    
    fetchUserDelete(id).then(() => {
      navigate('/users')
    }    )

  }
  

  useEffect(() => {
    fetchUsersShow(id)
    .then((data) =>{
      setState(data.user)
    }
     
    )
  }, []);


 



  return (
    <>
    <p>showページです</p>
    <h2>ログイン状態: {props.loggedInStatus}</h2>
    <ul>
      <li>name:{state?.name}</li>
      <li>email:{state?.email}</li>
      <li>gender:{state?.gender}</li>
      <li>self_introduction:{state?.self_introduction}</li>
    </ul>

    <button onClick={onClickEdit}>編集する</button>
    <button onClick={onClickDelete}>ログアウトする</button>
  
     
    </>
  )
};
