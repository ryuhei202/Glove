
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRooms } from "../../apis/rooms";
import { fetchLogoutUser } from "../../apis/users_logout";

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


  const [loading, setLoading] = useState<boolean>(true)
//グループチャットを取得？？
  const [groupChatRooms, setGroupEachChatRooms] = useState([])
  //個人チャットを取得
  const [eachChatRooms, setEachChatRooms] = useState([])

const navigate = useNavigate();
  const handleGetChatRooms =  () => {
    getRooms().then((res)=> {
      console.log(res)
      setEachChatRooms(res)
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

  console.log(eachChatRooms);
  // console.log(props.user)

  return (
    <>
    <p>chatroom一覧です。</p>
    <h2>ログイン状態: {props.loggedInStatus}</h2>
    <h2>current_user:{props.user.name} </h2>
    <button onClick={handleLogoutClick}>ログアウトする</button>
    
    {}
    
    
    </>
  )
};
