import { getValue } from "@testing-library/user-event/dist/utils";
import { memo, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getEachRooms } from "../../apis/eachrooms";

export const Rooms = memo((props:any) => {

const location = useLocation();
console.log(location);

const [content, setContent] = useState<string>("");

const [loading, setLoading] = useState<boolean>(true)

const [otherUser, setOtherUser] = useState<any>([]);
const [messages, setMessages] = useState<any>([]);

const onSubmit = () => {
  alert(content);
}
 
useEffect(() => {
//ここでotheruserのメッセージを取得する関数を実行する。
getEachRooms(location.state.roomId,location.state.userId).then((data)=>{
  console.log(data.messages)
  // console.log(data.other_user[0].name)
  setOtherUser(data.other_user[0])
  // console.log(otherUser)
  setMessages(data.messages)


}).catch()
},[]
)
console.log(messages[0])


  

  return (
    <>
    <p>{otherUser.name}とのchatroomです</p>
    <h2>ログイン状態: {props.loggedInStatus}</h2>
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
      <button onClick={onSubmit}>送信</button>

  </form>

    
    </>
  )
});
