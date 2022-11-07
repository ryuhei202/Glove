import { useContext } from "react";
import { CurrentUser } from "../../interfaces";
import { UserContext } from "../../providers/UserProvider";


export const Header = (props:any) => {

  const usercontext:CurrentUser = useContext(UserContext).currentUserInfo;
  console.log(usercontext?.data.logged_in)
  return (
    <>
    <p>{props.children}</p>
   { usercontext?.data.logged_in == true ?
      <h2>ログイン状態:ログインなう</h2>
    :
      <h2>ログイン状態:未ログイン</h2>
    }
  
    </>
  )
};
