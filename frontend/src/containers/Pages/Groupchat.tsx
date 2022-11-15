import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getEachRooms } from "../../apis/eachrooms";
import { getGroupChats } from "../../apis/groupchats";
import { createMessage } from "../../apis/messages";
import { Message, User } from "../../interfaces";
import { LoggedInStatesContext } from "../../providers/LoggedInStatesProvider";
import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";


export const GroupChatRoom = (props:any) => {

  const current_user = useContext(UserContext);
  console.log(current_user);

  const navigate = useNavigate();

  const [otherUser, setOtherUser] = useState<User[]>([]);
const [messages, setMessages] = useState<Message[]>([]);

// const [myMessages, setMyMessages] = useState<Message[]>([]);
const [content, setContent] = useState<string>("");

const onSubmit = () => {
  // alert(content);
  //↓リファクタリング必要（user＿idをuseContextのcurrent_userのidにする)前ページのlinkも変更する
  createMessage({
    user_id:current_user.currentUserInfo?.data?.user.id,
    room_id:messages[0]?.room_id,
    message:content
  }).then((res)=>{
console.log(res);
setMessages([...messages, res.message])
setContent("")
  }).catch((error)=>{
    console.log(error)
  })
}

  useEffect(()=>{
    //ここでotheruserのメッセージを取得する関数を実行する。
    if (!current_user.currentUserInfo?.data.user.id) return;
    getGroupChats(current_user.currentUserInfo?.data.user.language, current_user.currentUserInfo?.data.user.id).then((data)=>{
      console.log(data);
      setOtherUser(data.other_user)
      setMessages(data.messages)
    }).catch(error => {
      console.log(error);
    });
  },[current_user])
  console.log(otherUser);
  console.log(messages);
  
//認可処理
  useEffect(()=>{
    if (localStorage.getItem("current_user") == null) {
      navigate('/login')
    }
  },[])

  return (
    <>
    <Header>{current_user.currentUserInfo?.data.user.language}ページです</Header>
    {messages.map((message:Message,index:number)=>{
        for (let i = 0; i < otherUser.length; i++) {
          if (otherUser[i].id == message.user_id) {
              return (

                <p key={index}>{otherUser[i].name}:{message.message}</p>
              )
              
          }else {
            return(
              <p key={index}> あなた:{message.message}
              </p>
            )
          }
                                                    }

                                          }
                  )
      }
    
      
    <br />
    <form>
<h4>Message: </h4>
      <textarea value={content} onChange={(e)=>setContent(e.target.value)}/>
      <button onClick={onSubmit} type="button">送信</button>
  </form>
  <br />
    <Link to="/chatrooms">chatrooms</Link>
    <br />
    <Link to="/users">ユーザー一覧ページです</Link>
     
    </>
  )
};
