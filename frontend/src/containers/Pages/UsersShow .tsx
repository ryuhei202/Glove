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




export const UsersShow = (props:any) => {

  const navigate = useNavigate();

  

  const current_user = useContext(UserContext);
  console.log(current_user);

  

  const { setChatRooms } = useContext(ChatRoomsContext);

  const [state, setState] = useState<User | null>(null);

  const  { id } = useParams<{ id: any }>();

//編集ボタンを押した際のアクション
  const onClickEdit = () => {
    navigate('edit')
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

  const chatcontext = useContext(ChatRoomsContext);
  console.log(chatcontext);

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
      userid:current_user.currentUserInfo?.data.user.id,
      other_userid:id
    }).then(res => {
      console.log(res)
      
      navigate(`/chatrooms/${res.room.id}`,{ state: { roomId:res.room.id, userId:current_user.currentUserInfo?.data.user.id} })
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
    <Header>show</Header>
    
   
<div className="mt-16 flex justify-center">

    <div className="w-80 bg-white shadow rounded border border-transparent">
    <div className="h-48 w-full checker-bg flex items-center justify-center p-4 text-blue-500">
     
      <img className="rounded-full" src={state?.profile_image?.url ? (state?.profile_image?.url) : ("../icon/kkrn_icon_user_3.png")} width={180} height={180} />
     
    </div>

    <div className="p-4 border-t border-gray-200">
      <ul className="">
      <label className="mt-3 block text-sm font-medium text-neutral-600"> Name: </label>
        <li className="ml-2 text-gray-600 font-medium">{state?.name}</li>
        <label className="mt-3 block text-sm font-medium text-neutral-600"> Gender: </label>
        <li className="ml-2 text-gray-600 font-medium">{state?.gender}</li>
        <label className="mt-3 block text-sm font-medium text-neutral-600"> Self introduction: </label>
        <li className="ml-2 text-gray-600 font-medium mt-1">{state?.self_introduction}</li>
      </ul>
      { id == current_user.currentUserInfo?.data.user.id ? ( <button className="my-3 ml-auto shadow-lg px-2 py-1  bg-blue-400 text-sm text-white font-semibold rounded  hover:bg-blue-500 hover:shadow-sm hover:translate-y-0.5 transform transition" onClick={onClickEdit}>編集する</button>) : ( <button className="my-3 ml-auto shadow-lg px-2 py-1  bg-blue-400 text-sm text-white font-semibold rounded  hover:bg-blue-500 hover:shadow-sm hover:translate-y-0.5 transform transition" onClick={onClickCreateChatRoom}>チャットする</button>)}
     
     

    </div>
  </div>
  </div>
    </>
  )
};
