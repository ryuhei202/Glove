import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogoutUser } from "../../apis/users_logout";
import { CurrentUser } from "../../interfaces";
import { UserContext } from "../../providers/UserProvider";
import { useLogOut } from "../../hooks/useLogOut";
import { Link } from "react-router-dom";


export const Header = (props:any) => {

  const { handleLogoutClick } = useLogOut();

  const usercontext:CurrentUser = useContext(UserContext).currentUserInfo;
  const navigate = useNavigate();
  console.log(usercontext);
  console.log(usercontext?.data?.logged_in);
  console.log(usercontext?.data?.user);
  
  const user_name = usercontext?.data?.user.name;
  

  return (
    <>
    <div className="mb-10 text-xl text-center font-bold bg-red-300">

    <p>{props.children}</p>
   { usercontext?.data?.logged_in == true ?
    <>
      <Link to={`/users/${usercontext?.data?.user.id}`}>あなた:{user_name}</Link>
      <br />
      <button onClick={handleLogoutClick}>ログアウトする</button>
    </>
    :
      <h2>ログインしていません</h2>
    }
    </div>
  
    </>
  )
};
