
import { useContext, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getEachRooms } from "../../apis/eachrooms";
import { getGroupChats } from "../../apis/groupchats";
import { LoggedInStatesContext } from "../../providers/LoggedInStatesProvider";
import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";


export const GroupChatRoom = (props:any) => {

  const current_user = useContext(UserContext);
  console.log(current_user);

  useEffect(()=>{
    //ここでotheruserのメッセージを取得する関数を実行する。
    if (!current_user.currentUserInfo?.data.user.id) return;
    getGroupChats(current_user.currentUserInfo?.data.user.language, current_user.currentUserInfo?.data.user.id).then((data)=>{
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  },[current_user])


    // getEachRooms(location.state.roomId,location.state.userId).then((data)=>{
    //   console.log(data.messages)
    //   // console.log(data.other_user[0].name)
    //   setOtherUser(data.other_user)
    
    //   setMessages(data.messages)
    
    
    



  return (
    <>
    <Header>groupchatページです</Header>
    <br />
    <Link to="/chatrooms">chatrooms</Link>
     
    </>
  )
};
