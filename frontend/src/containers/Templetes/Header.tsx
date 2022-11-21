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
    <header className="text-gray-700 border-b border-gray-200" >

      <div className="container h-28 flex mx-auto p-5 flex-col md:flex-row items-center">
        <div className="flex md:flex-col font-medium text-gray-900 ">
          <p className="text-xl mr-5">Glove</p>
          <p className="mb-4 md:mb-0">{props.children}</p>
        </div>
   { usercontext?.data?.logged_in == true ?
   
      <nav className="flex md:ml-auto text-base">
        <Link className="mr-3 hover:text-blue-400 duration-300" to="/users">Users</Link>
        <Link className="mr-3 hover:text-blue-400 duration-300" to="/chatrooms">Chat</Link>
       
       <Link  to={`/users/${usercontext?.data?.user.id}`}>
            <img className="rounded-full mr-1" src={usercontext?.data?.user.profile_image?.url ? (usercontext?.data?.user.profile_image?.url) : ("../../icon/kkrn_icon_user_3.png")} width={30} height={30} />
       </Link>
        
        <Link className="mr-3 hover:text-blue-400 duration-300" to={`/users/${usercontext?.data?.user.id}`}>{user_name}</Link>
        <button className="hover:text-blue-400 duration-300 flex text-center" onClick={handleLogoutClick}>Logout</button>
      </nav>
   
    :
      <h2 className="flex md:ml-auto text-base">ログインしていません</h2>
    }
      </div>
    </header>
  
    </>
  )
};
