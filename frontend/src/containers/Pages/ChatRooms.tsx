
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getRooms } from "../../apis/rooms";
import { fetchLogoutUser } from "../../apis/users_logout";
import { ChatRoom, CurrentUser, Room } from "../../interfaces";
import { ChatRoomsContext, ChatRoomsProvider } from "../../providers/ChatRoomsProvider";
import { LoggedInStatesContext } from "../../providers/LoggedInStatesProvider";

import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";

export const ChatRooms = (props:any) => {

  const navigate = useNavigate();

  const { setChatRooms } = useContext(ChatRoomsContext);
  const chatcontext = useContext(ChatRoomsContext);
  console.log(chatcontext);
  const direct_rooms = chatcontext.chatRooms?.rooms
  const group_room = chatcontext.chatRooms?.grouproom
  const group_room_message = chatcontext.chatRooms?.grlastmessage
  console.log(direct_rooms);
  console.log(group_room);
  console.log(group_room_message);

  const current_user = useContext(UserContext);
  console.log(current_user);

  const [loading, setLoading] = useState<boolean>(true)



  //チャット一覧を取得
  const handleGetChatRooms =  () => {
    if (!current_user.currentUserInfo?.data?.user.id) return;
    getRooms(current_user.currentUserInfo?.data.user.id).then((res)=> {
      console.log(res);
      setChatRooms(res);
    }).catch((error)=>{
      console.log(error)
    })
  };

  //認可処理
  useEffect(()=>{
   if (localStorage.getItem("current_user") == null) {
     navigate('/login')
   }
 },[])

  useEffect(() => {
    handleGetChatRooms()
  }, [current_user]);




  return (
    <>
    
    <Header>chat</Header>
    <div className="mb-3 mt-10 mx-5 p-3 border  border-sky-400  rounded-3xl fixed top-28 right-0 left-0 md:right-1/4 md:left-1/4 h-3/4  overflow-auto">
    <div className="mx-6 mt-10">
      <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">Messages.</h2>
    </div>

    <div className="mx-6 mt-10">
 <Link className="" to={`/groupchat/${group_room?.language}`}>
  <p className="ml-8">GroupChat</p>
 
  <p className="ml-8 text-xl">
 
    {group_room_message?.message.length > 30 ? group_room_message?.message.substr(0, 30) + "..." : group_room_message?.message}
    </p>
  </Link>
  </div>

  <div className=" mx-6 my-0">
     {direct_rooms ? (
 direct_rooms?.map((chatRoom:ChatRoom, index:number) => {
    return (
      <React.Fragment key={index}>  
      <div className="my-3">
      <Link  to={`${chatRoom.room.id}`} state={{userId:current_user?.currentUserInfo?.data?.user.id, roomId:chatRoom.room.id} }>
<div className="flex">
<img className="rounded-full mr-1" src={chatRoom.other_users[0]?.profile_image?.url ? (chatRoom.other_users[0]?.profile_image?.url) : ("../icon/kkrn_icon_user_3.png")} width={30} height={30} />
      <p>{chatRoom.other_users[0]?.name}</p>
</div>

      
      <p className="ml-8 text-xl">{chatRoom.last_message === null ? "まだメッセージはありません。" : chatRoom.last_message.message.length > 30 ? chatRoom.last_message.message.substr(0, 30) + "..." : chatRoom.last_message.message}</p> 
  
      
    </Link>
        </div> 

    </React.Fragment>
    )
  } ) ): (
    <p>トークルームがありません</p>
  )}    
  
  </div>
  </div>
    </>
  )
};
