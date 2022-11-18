import React, { useCallback, useContext, useEffect, useState } from "react";
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
const [messages, setMessages] = useState<any>([]);
const [image, setImage] = useState<File>()

// const [myMessages, setMyMessages] = useState<Message[]>([]);
const [content, setContent] = useState<string>("");

const onSubmit = () => {
  const data = createFormData();

  createMessage(
   data
  ).then((res)=>{
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

  const uploadImage = useCallback((e:any) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

   // FormData形式でデータを作成
 const createFormData = (): FormData => {
  const formData = new FormData()

  formData.append("message", content)
  formData.append("user_id", current_user.currentUserInfo?.data?.user.id)
  formData.append("room_id", messages[0]?.room_id)
  if (image) formData.append("image", image)

  return formData
}

  return (
    <>
    <Header>{current_user.currentUserInfo?.data.user.language}ページです</Header>
    
    {messages.map((message:any,index:number)=>{
        for (let i = 0; i < otherUser.length; i++) {
          if (otherUser[i].id == message.user_id && message.image.url) {
              return (
                <React.Fragment key={index} >
                <p key={index}>{otherUser[i].name}:{message.message}</p>
                <img src={message?.image.url} width={150} height={150}  /> 
                </React.Fragment>
              )
              
          }else if (otherUser[i].id == message.user_id ){
            return (
              <React.Fragment key={index} >
              <p >{otherUser[i].name}:{message.message}</p>
              </React.Fragment>
            )
          }else if(otherUser[i].id != message.user_id && message.image.url){
            return (
              <React.Fragment key={index} >
              <p >あなた:{message.message}</p>
              <img src={message?.image.url} width={150} height={150}  /> 
              </React.Fragment>
            )
          }else if(otherUser[i].id != message.user_id){
            return(
              <React.Fragment key={index} >
              <p > あなた:{message.message}
              </p>
             
              </React.Fragment>)
          }
            
            
          
                                                    }

                                          }
                  )
      }
    
      
    <br />
    <form>
<h4>Message: </h4>
      <textarea value={content} onChange={(e)=>setContent(e.target.value)}/>
      <input
              accept="image/*"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e)
              }}
            />
      <button onClick={onSubmit} type="button">送信</button>
      <button onClick={onSubmit} type="button">送信</button>
  </form>
  <br />
    <Link to="/chatrooms">chatrooms</Link>
    <br />
    <Link to="/users">ユーザー一覧ページです</Link>
     
    </>
  )
};
