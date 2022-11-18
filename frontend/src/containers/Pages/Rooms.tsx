import { getValue } from "@testing-library/user-event/dist/utils";
import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getEachRooms } from "../../apis/eachrooms";
import { createMessage } from "../../apis/messages";
import { User } from "../../interfaces";
import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";

export const Rooms = memo((props:any) => {

const location = useLocation();
console.log(location);
 
const navigate = useNavigate();

const current_user = useContext(UserContext);
  console.log(current_user);

const [content, setContent] = useState<string>("");

const [loading, setLoading] = useState<boolean>(true)

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




  

  return (
    <>
    <Header>{otherUser?.name}とのchatroomです</Header>
    {messages.map((m:any,index:number)=>{
    //  if(m.user_id === otherUser.id){
    //       return (
    //       <React.Fragment key={index} >
    //           <p key={index}>{otherUser.name}:{m.message}</p>
    //           <img src={m?.image.url} width={150} height={150}  />
    //       </React.Fragment>
    //       )
      
    //     }
    //  else if(m.user_id != otherUser.id){
    //     return(          
    //       <React.Fragment key={index} >
    //       <p >あなた:{m.message}</p>   
    //       <img src={m?.image.url} width={150} height={150}  />                
    //       </React.Fragment>
        
    //     )
       
    //   }
    
       if(m.user_id === otherUser?.id && m.image.url){
        return(
          <React.Fragment key={index} >
            <div>
            <img src={otherUser?.profile_image?.url} width={30} height={30}  />
            {otherUser?.name}:
            </div>
          <p key={index}> {m.message}</p>   
            <img src={m?.image.url} width={150} height={150}  />
          </React.Fragment>
         
        )}else if(m.user_id === otherUser?.id && !m.image.url){
          return (
            
          <React.Fragment key={index} >
            <div>
            <img src={otherUser?.profile_image?.url} width={30} height={30}  />
            {otherUser?.name}:
            </div>
              <p key={index}>{m.message}</p>
          </React.Fragment>
          )
      
        }
      else if(m.user_id == current_user.currentUserInfo?.data.user.id && m.image.url){
        return(

        <React.Fragment key={index} >
         <img src={current_user.currentUserInfo.data?.user.profile_image?.url} width={30} height={30}  />
          <p >あなた:{m.message}</p>        
            <img src={m?.image.url} width={150} height={150}  />        
          </React.Fragment>
        )
      }else if(m.user_id == current_user.currentUserInfo?.data.user.id && !m.image.url){
        return(          
          <React.Fragment key={index} >
           <img src={current_user.currentUserInfo.data?.user.profile_image?.url} width={30} height={30}  />
          <p >あなた:{m.message}</p>                   
          </React.Fragment>
        
        )
       
      }
    })}

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
  </form>

  <Link to="/users">ユーザー一覧ページです</Link>

  <br />
    <Link to="/chatrooms">chatroom</Link>
    </>
  )
});
