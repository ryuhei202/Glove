import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getEachRooms } from "../../apis/eachrooms";

export const Rooms = (props:any) => {

const location = useLocation();
console.log(location);

const [loading, setLoading] = useState<boolean>(true)
const [otherUser, setOtherUser] = useState<string>();
const [messages, setMessages] = useState<any>([]);
 
useEffect(() => {
//ここでotheruserのメッセージを取得する関数を実行する。
getEachRooms(location.state.roomId,location.state.userId).then((data)=>{
  console.log(data.messages)
  // console.log(data.other_user[0].name)
  setOtherUser(data.other_user[0].name)
  // console.log(otherUser)
  setMessages(data.messages)

}).catch()
},[]
)
// console.log(messages[0].message)
  

  return (
    <>
    <p>{otherUser}とのchatroomです</p>
    <h2>ログイン状態: {props.loggedInStatus}</h2>
    {messages.map((m:any,index:number)=>{
      return(
        <p key={index}>{m.message}</p>
      )
    })}

    
    </>
  )
};
