
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getRooms } from "../../apis/rooms";
import { fetchLogoutUser } from "../../apis/users_logout";
import { UserContext } from "../../providers/UserProvider";

// interface ChatRoom {
//   chatRoom: {
//     id: number
//   }
//   otherUsers: {
//     id: number
//     name: string
//     gender: string
//     email: string
//     password_digest: string
//     self_introduction?: string
//     profile_image?: any
//     createdAt?: Date
//     updatedAt?: Date
//   }
//   lastMessage: {
//     chatRoomId: number
//     userId: number | undefined
//     message: string
//     createdAt?: Date
//   }
// }




export const ChatRooms = (props:any) => {

  const context = useContext(UserContext);
  console.log(context);

  const [loading, setLoading] = useState<boolean>(true)
//グループチャットを取得？？
  const [groupChatRooms, setGroupEachChatRooms] = useState()
  //個人チャットを取得
  const [chatRooms, setChatRooms] = useState([])

const navigate = useNavigate();

  const handleGetChatRooms =  () => {
    getRooms(context.currentUserInfo.data.user.id).then((res)=> {
      console.log(res);
      setChatRooms(res.rooms);
    }).catch((error)=>{
      console.log(error)
    })
  };

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
    handleGetChatRooms()
  }, []);

  console.log(chatRooms);
  // console.log(props.user)

  return (
    <>
    
 <p>chatroom一覧です。</p>
 <h2>ログイン状態: {props.loggedInStatus}</h2>
 <h2>current_user:{props.user.name} </h2>
 {chatRooms.length > 0 ? (
  chatRooms.map((chatRoom:any) => {
    return (
      <>
    <Link key={chatRoom.room.id} to={`${chatRoom.room.id}`} state={{userId:context.currentUserInfo.data.user.id, roomId:chatRoom.room.id} }>
        {chatRoom.other_users[0].name}:  {chatRoom.last_message === null ? "まだメッセージはありません。" : chatRoom.last_message.message.length > 30 ? chatRoom.last_message.message.substr(0, 30) + "..." : chatRoom.last_message.message}
      </Link>
      <br />
    </>
    )
  } ) ): (
    <p>トークルームがありません</p>
  )}
 

<br />
 <button onClick={handleLogoutClick}>ログアウトする</button>
    
   
    
    
    
    
    </>
  )
};
