import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { groupChatGet,  } from "../apis/groupchat_get";
import { fetchLogoutUser } from "../apis/users_logout";

export const Groupchat = (props:any) => {



  const navigate = useNavigate();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  console.log(query.get("language"));
  

  



const handleLogoutClick = () => {
  fetchLogoutUser().then(res => {
    console.log(res)
    props.handleLogout()
    navigate("/")
    
  }).catch(error => {
    console.log(error)
  })


}

useEffect(() => {
  groupChatGet(query.get("language")).then(res => {
    console.log(res)
  }).catch(error => {
    console.log(error)
  })
})




  return (
    <>
    <p>グループチャットページです</p>
    <h2>ログイン状態: {props.loggedInStatus}</h2>
    <button onClick={handleLogoutClick}>ログアウト</button>

    </>
  )
};
