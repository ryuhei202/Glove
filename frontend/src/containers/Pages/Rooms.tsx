import { getValue } from "@testing-library/user-event/dist/utils";
import React, { memo, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getEachRooms } from "../../apis/eachrooms";
import { createMessage } from "../../apis/messages";
import { User } from "../../interfaces";
import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";
import { MessageForm } from "../Templetes/MessageForm";

export const Rooms = memo((props:any) => {

const location = useLocation();
console.log(location);
 
const navigate = useNavigate();

const current_user = useContext(UserContext);
  console.log(current_user);

const [content, setContent] = useState<string>("");

const [loading, setLoading] = useState<boolean>(true)

const chatdiv = useRef<HTMLDivElement>(null);
const [otherUser, setOtherUser] = useState<User>();
const [messages, setMessages] = useState<any>([]);

const [image, setImage] = useState<File>()

useEffect(()=>{
  //ここでotheruserのメッセージを取得する関数を実行する。
  getEachRooms(location.state.roomId,location.state.userId).then((data)=>{
    console.log(data.messages)
    // console.log(data.other_user[0].name)
    setOtherUser(data.other_user[0])
    
    setMessages(data.messages)
    
    
  }).catch();
},[])

//認可処理
useEffect(()=>{
  if (localStorage.getItem("current_user") == null) {
    navigate('/login')
  }
},[])

const onSubmit = () => {
  const data = createFormData();
    console.log(data.values())
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
 
const uploadImage = useCallback((e:any) => {
  const file = e.target.files[0]
  setImage(file)
}, [])

 // FormData形式でデータを作成
 const createFormData = (): FormData => {
  const formData = new FormData()

  formData.append("message", content)
  formData.append("user_id", location.state.userId,)
  formData.append("room_id", location.state.roomId)
  if (image) formData.append("image", image)

  return formData
}


console.log(otherUser)
console.log(messages)



const onChangeTextare = (e:any) => {
  setContent(e.target.value)
}

useLayoutEffect(()=>{

  chatdiv?.current?.scrollIntoView();
})
  

  return (
    <>
    <Header>{otherUser?.name}とのchatroomです</Header>
    
    <div className="mt-4 mx-5 p-3 border  border-sky-400  rounded-3xl fixed top-28 bottom-28 right-0 left-0 md:right-1/4 md:left-1/4   overflow-auto">
    {messages.map((m:any,index:number)=>{
   
    
       if(m.user_id === otherUser?.id && m.image.url){
        return(
          <React.Fragment key={index} >
              <div className="mt-1 mb-1 w-2/3 break-words">

            {/* ユーザー */}
            <div className="flex ml-2">
                <Link to={`/users/${otherUser?.id}`}><img className="rounded-full" src={otherUser?.profile_image?.url ? (otherUser?.profile_image?.url) : ("../icon/kkrn_icon_user_3.png")} width={30} height={30} /></Link>
  
                <Link to={`/users/${otherUser?.id}`} className="mt-[4px] ml-[2px] text-sm text-gray-600 ">{otherUser?.name}</Link>
              </div>
          
              {/* 吹き出し */}
              <div className="mb-3">
             <p className="ml-10 text-xl">{m?.message}</p>
             <img className="rounded-md ml-10" src={m?.image.url} width={150} height={150}  /> 
              </div>
              </div>

          </React.Fragment>
         
        )}else if(m.user_id === otherUser?.id && !m.image.url){
          return (
            
          <React.Fragment key={index} >
             <div className=" mt-1 mb-1 w-2/3 break-words">
             {/* ユーザー */}
             <div className="flex ml-2">
                <Link to={`/users/${otherUser?.id}`}><img className="rounded-full" src={otherUser?.profile_image?.url ? (otherUser?.profile_image?.url) : ("../icon/kkrn_icon_user_3.png")} width={30} height={30} /></Link>
  
                <Link to={`/users/${otherUser?.id}`} className="mt-[4px] ml-[2px] text-sm text-gray-600 ">{otherUser?.name}</Link>
              </div>

              <div className="mb-3">
             <p className="ml-10 text-xl">{m?.message}</p>
              </div>
              </div>
            {/* <div>
            <img src={otherUser?.profile_image?.url} width={30} height={30}  />
            {otherUser?.name}:
            </div> */}
              {/* <p key={index}>{m.message}</p> */}
          </React.Fragment>
          )
      
        }
      else if(m.user_id == current_user.currentUserInfo?.data.user.id && m.image.url){
        return(

        <React.Fragment key={index} >
   <div className="text-right mt-1 mb-1 ml-64">
  <p className="text-sm text-gray-600 mr-4">あなた</p>      
           {/* 吹き出し */}
           <div className="my-3">
             <img className="ml-auto rounded-md mr-4" src={m?.image.url} width={150} height={150}  /> 
             <p className="text-xl mr-4">{m.message}</p>
              </div>      
              </div>      

          </React.Fragment>
        )
      }else if(m.user_id == current_user.currentUserInfo?.data.user.id && !m.image.url){
        return(          
          <React.Fragment key={index} >
     <div className="text-right mt-1 mb-1 ml-64">
    <p className="text-sm text-gray-600 mr-4">あなた</p>   
        {/* 吹き出し */}
        <div className="my-3">
          
             <p className="text-xl mr-4">{m.message}</p>
              </div>         
              </div>        
          </React.Fragment>
        
        )
       
      }
    })}
    <div ref={chatdiv}></div>
    </div>

<MessageForm content={content} onChangeTextare={onChangeTextare} uploadImage={uploadImage} onSubmit={onSubmit} />
    </>
  )
});
