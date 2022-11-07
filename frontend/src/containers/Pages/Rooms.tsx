import { getValue } from "@testing-library/user-event/dist/utils";
import { memo, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getEachRooms } from "../../apis/eachrooms";
import { createMessage } from "../../apis/messages";
import { Header } from "../Templetes/Header";

export const Rooms = memo((props:any) => {

const location = useLocation();
console.log(location);

const [content, setContent] = useState<string>("");

const [loading, setLoading] = useState<boolean>(true)

const [otherUser, setOtherUser] = useState<any>([]);
const [messages, setMessages] = useState<any>([]);

const onSubmit = () => {
  // alert(content);
  //↓リファクタリング必要（user＿idをuseContextのcurrent_userのidにする)前ページのlinkも変更する
  createMessage({
    user_id:location.state.userId,
    room_id:location.state.roomId,
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
getEachRooms(location.state.roomId,location.state.userId).then((data)=>{
  console.log(data.messages)
  console.log(data.other_user[0].name)
  setOtherUser(data.other_user[0])
  // console.log(otherUser)
  setMessages(data.messages)


}).catch();
},[])


console.log(messages);


  

  return (
    <>
    <Header>{otherUser.name}とのchatroomです</Header>
    {messages.map((m:any,index:number)=>{
      if(m.user_id === otherUser.id){
        return(
          <p key={index}>{otherUser.name}:{m.message}</p>
         
        )
      }else{
        return( 
        <p key={index}>あなた:{m.message}</p>
        )
       
      }
    
    })}

<form>
<h4>Message: </h4>
      <textarea value={content} onChange={(e)=>setContent(e.target.value)}/>
      <button onClick={onSubmit} type="button">送信</button>
  </form>

    
    </>
  )
});
