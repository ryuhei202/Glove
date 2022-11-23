import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getEachRooms } from "../../apis/eachrooms";
import { getGroupChats } from "../../apis/groupchats";
import { createMessage } from "../../apis/messages";
import { Message, User } from "../../interfaces";
import { LoggedInStatesContext } from "../../providers/LoggedInStatesProvider";
import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";
import { MessageForm } from "../Templetes/MessageForm";
import { Users } from "./Users";
import { UsersRight } from "./UsersRight";


export const GroupChatRoom = (props:any) => {

  const current_user = useContext(UserContext);
  console.log(current_user);
  
  const chatdiv = useRef<HTMLDivElement>(null);

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

console.log(messages);

const onChangeTextare = (e:any) => {
  setContent(e.target.value)
}

useLayoutEffect(()=>{

  chatdiv?.current?.scrollIntoView();
})



  return (
    <>
    <Header >group chat</Header>


    <div className="mt-4 mx-5 p-3 border  border-sky-400  rounded-3xl fixed top-28 bottom-28 right-0 md:right-1/4 left-0   overflow-auto">
  
    {messages.map((message:any,index:number)=>{
      for (let i = 0; i < otherUser.length; i++) {
          if (otherUser[i].id == message.user_id && message.image.url) {
           return (
             <React.Fragment key={index} >
              <div className="mt-1 mb-1 w-2/3 break-words">

             {/* ユーザー */}
              <div className="flex ml-2">
                <Link to={`/users/${otherUser[i].id}`}><img className="rounded-full" src={otherUser[i].profile_image?.url ? (otherUser[i].profile_image?.url) : ("../icon/kkrn_icon_user_3.png")} width={30} height={30} /></Link>
  
                <Link to={`/users/${otherUser[i].id}`} className="mt-[4px] ml-[2px] text-sm text-gray-600 ">{otherUser[i].name}</Link>
              </div>

              {/* 吹き出し */}
              <div className="mb-3">
             <p className="ml-10 text-xl">{message.message}</p>
             <img className="rounded-md ml-10" src={message?.image.url} width={150} height={150}  /> 
              </div>
              </div>
             </React.Fragment>
           )
           
       }else if(otherUser[i].id == message.user_id && !message.image.url){
        return (
          <React.Fragment key={index} >
            <div className=" mt-1 mb-1 w-2/3 break-words">
              {/* ユーザー */}
              <div className="flex ml-2">

              <Link to={`/users/${otherUser[i].id}`}><img className="rounded-full" src={otherUser[i].profile_image?.url ? (otherUser[i].profile_image?.url) : ("../icon/kkrn_icon_user_3.png")} width={30} height={30} /></Link>
                
                <Link to={`/users/${otherUser[i].id}`} className="mt-[4px] ml-[2px] text-sm text-gray-600 ">{otherUser[i].name}</Link>

            </div>

              {/* 吹き出し */}
              <div className="mb-3">
             <p className="ml-10 text-xl">{message.message}</p>
              </div>

            </div>
          </React.Fragment>
        )
       }else if(current_user.currentUserInfo?.data.user.id == message.user_id && message.image.url){
         return (
           <React.Fragment key={index} >
            
            <div className="text-right mt-1 mb-1 ml-64">
           <p className="text-sm text-gray-600 mr-4">あなた</p>

          {/* 吹き出し */}
          <div className="my-3">
             <img className="ml-auto rounded-md mr-4" src={message?.image.url} width={150} height={150}  /> 
             <p className="text-xl mr-4">{message.message}</p>
              </div>
              
            </div>
          
           </React.Fragment>
         )
       
       }else if(current_user.currentUserInfo?.data.user.id == message.user_id && !message.image.url){
        return (
          <React.Fragment key={index} >
            <div className="ml-64 mt-1 mb-1 text-right  break-words">
            <p className="text-sm text-gray-600 mr-4">あなた</p>
            
           {/* 吹き出し */}
              <div className="">
             <p className="text-xl mr-4">{message.message}</p>
              </div>
            </div>
          </React.Fragment>
        )
       }}
           }
                  )
      }
      <div ref={chatdiv}></div>
    </div>

 <div className="mt-4 mx-1 p-3 border border-red-600 fixed top-28 bottom-28 right-0  left-3/4  rounded-3xl overflow-auto hidden md:block">
  <UsersRight></UsersRight>
 </div>


  <MessageForm content={content} onChangeTextare={onChangeTextare} uploadImage={uploadImage} onSubmit={onSubmit} />


    </>
  )
};
