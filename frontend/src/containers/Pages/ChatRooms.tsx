
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

  const current_user = useContext(UserContext);
  console.log(current_user);

  const [loading, setLoading] = useState<boolean>(true)


  //チャット一覧を取得
  const handleGetChatRooms =  () => {
    if (!current_user.currentUserInfo?.data.user.id) return;
    getRooms(current_user.currentUserInfo?.data.user.id).then((res)=> {
      console.log(res);
      setChatRooms(res.rooms);
    }).catch((error)=>{
      console.log(error)
    })
  };

  const handleLogoutClick = () => {
    fetchLogoutUser().then(res => {
      console.log(res)
      props.handleLogout(res)
      navigate("/")
      
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    handleGetChatRooms()
  }, [current_user]);

  return (
    <>
    
    <Header>chatroom一覧です</Header>
 <h2>current_user:{current_user.currentUserInfo?.data?.user.name} </h2>
     {chatcontext.chatRooms ? (
  chatcontext.chatRooms?.map((chatRoom:ChatRoom, index:number) => {
    return (
      <React.Fragment key={index}>   
    <Link  to={`${chatRoom.room.id}`} state={{userId:current_user.currentUserInfo.data.user.id, roomId:chatRoom.room.id} }>
        {chatRoom.other_users[0]?.name}:  {chatRoom.last_message === null ? "まだメッセージはありません。" : chatRoom.last_message.message.length > 30 ? chatRoom.last_message.message.substr(0, 30) + "..." : chatRoom.last_message.message}
    </Link>
      <br /> 

    </React.Fragment>
    )
  } ) ): (
    <p>トークルームがありません</p>
  )} 
 

<br /> 
 <button onClick={handleLogoutClick}>ログアウトする</button>
 <Link to="/users">ユーザー一覧ページです</Link>
    
   
    
    
    
    
    </>
  )
};
