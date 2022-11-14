//ログアウト機能のカスタムフック

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogoutUser } from "../apis/users_logout"
import { UserContext } from "../providers/UserProvider";

export const useLogOut = () => {

  const { setCurrentUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    fetchLogoutUser().then(res => {
      console.log(res)
      setCurrentUserInfo({res});
      localStorage.clear()
      navigate("/")      
    }).catch(error => {
      console.log(error)
    })
  };

  return { handleLogoutClick };

};
