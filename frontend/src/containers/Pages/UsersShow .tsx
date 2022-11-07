// import { match } from "assert";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRoom } from "../../apis/createroom";
import { fetchUsersShow } from "../../apis/users_id";
import { fetchUserDelete } from "../../apis/user_delete";
import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";


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
  const context = useContext(UserContext);
  console.log(context.currentUserInfo);



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
      navigate('/')
    }    )

  }

  const onClickCreateChatRoom = () => {

    createRoom({
      userid:context.currentUserInfo.id,
      other_userid:id
    }).then(res => {
      console.log(res)
      
      navigate(`/chatrooms/${res.room.id}`,{ state: { roomId:res.room.id, userId:context.currentUserInfo.id} })
    }).catch((error) => {
      console.log(error)
    })
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
    <Header>showページです</Header>
    <ul>
      <li>name:{state?.name}</li>
      <li>email:{state?.email}</li>
      <li>gender:{state?.gender}</li>
      <li>self_introduction:{state?.self_introduction}</li>
    </ul>

    <button onClick={onClickEdit}>編集する</button>
    <button onClick={onClickDelete}>ログアウトする</button>
    <button onClick={onClickCreateChatRoom}>チャットする</button>
  
     
    </>
  )
};
