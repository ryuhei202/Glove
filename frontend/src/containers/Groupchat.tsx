import { useNavigate } from "react-router-dom";
import { fetchLogoutUser } from "../apis/users_logout";

export const Groupchat = (props:any) => {

  const navigate = useNavigate();

const handleLogoutClick = () => {
  fetchLogoutUser().then(res => {
    console.log(res)
    props.handleLogout()
    navigate("/")
    
  }).catch(error => {
    console.log(error)
  })


};


  return (
    <>
    <p>グループチャットページです</p>
    <h2>ログイン状態: {props.loggedInStatus}</h2>
    <button onClick={handleLogoutClick}>ログアウト</button>

    </>
  )
};