import { useState } from "react";
import { useLocation } from "react-router-dom";

export const Rooms = (props:any) => {

const location = useLocation();
console.log(location);

const [loading, setLoading] = useState<boolean>(true)

  return (
    <>
    <p>個別chatroomです</p>
    <h2>ログイン状態: {props.loggedInStatus}</h2>
    
    </>
  )
};
