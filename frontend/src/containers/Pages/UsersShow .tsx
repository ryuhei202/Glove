// import { match } from "assert";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { createRoom } from "../../apis/createroom";
import { getRooms } from "../../apis/rooms";
import { fetchUsersShow } from "../../apis/users_id";
import { fetchUserDelete } from "../../apis/user_delete";
import { CurrentUser, User } from "../../interfaces";
import { ChatRoomsContext } from "../../providers/ChatRoomsProvider";
import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";


// type Userstype = {
//   created_at: string;
//   email: string;
//   gender: string;
//   id: number;
//   name: string;
//   password_digest: string;
//   profile_image: Url;
//   self_introduction: string;
//   updated_at: string;
// }

// interface Url {
//   url:string;
// }



export const UsersShow = (props:any) => {

  const navigate = useNavigate();
  const usercontext:CurrentUser = useContext(UserContext).currentUserInfo;
  console.log(usercontext);

  const chatcontext = useContext(ChatRoomsContext);
  console.log(chatcontext.chatRooms);

  const current_user = useContext(UserContext);
  console.log(current_user);

  

  const { setChatRooms } = useContext(ChatRoomsContext);

  const [state, setState] = useState<User | null>(null);

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

  const handleGetChatRooms =  () => {
    if (!current_user.currentUserInfo?.data?.user.id) return;
    getRooms(current_user.currentUserInfo?.data.user.id).then((res)=> {
      console.log(res);
      setChatRooms(res.rooms);
    }).catch((error)=>{
      console.log(error)
    })
  };

  

  const findObjById = (chatrooms:any, roomid:number) => {
    
    for (let i = 0; i < chatrooms.length; i++) {
      if (chatrooms[i].other_users[0]?.id == roomid) {
        return chatrooms[i].room.id;
      }
    }
    return false;
  }
  
  const onClickCreateChatRoom = () => {

     if(findObjById(chatcontext.chatRooms,id)){
      console.log(findObjById(chatcontext.chatRooms,id))
      navigate(`/chatrooms/${findObjById(chatcontext.chatRooms,id)}`, { state: {userId:current_user.currentUserInfo.data.user.id, roomId:findObjById(chatcontext.chatRooms,id)} })
    }else{

    createRoom({
      userid:usercontext.data.user.id,
      other_userid:id
    }).then(res => {
      console.log(res)
      
      navigate(`/chatrooms/${res.room.id}`,{ state: { roomId:res.room.id, userId:usercontext.data.user.id} })
    }).catch((error) => {
      console.log(error)
    })
    }
  }
    
  

  useEffect(() => {
    fetchUsersShow(id)
    .then((data) =>{
      console.log(data)
      setState(data.user)
    }
     
    )
  }, []);



  useEffect(() => {
    handleGetChatRooms()
  }, [current_user]);

 
//認可処理
useEffect(()=>{
  if (localStorage.getItem("current_user") == null) {
    navigate('/login')
  }
},[])
 



  return (
    <>
    <Header>showページです</Header>
    <ul>
    <img src={state?.profile_image?.url} width={150} height={150}  />
      <li>name:{state?.name}</li>
      <li>email:{state?.email}</li>
      <li>gender:{state?.gender}</li>
      <li>self_introduction:{state?.self_introduction}</li>
    </ul>

    <button onClick={onClickEdit}>編集する</button>
    <button onClick={onClickCreateChatRoom}>チャットする</button>

    </>
  )
};
