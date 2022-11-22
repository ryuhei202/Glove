
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUser } from "../../interfaces";
import { LoggedInStatesContext } from "../../providers/LoggedInStatesProvider";
import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";


export const Top = (props:any) => {

  const usercontext:CurrentUser = useContext(UserContext).currentUserInfo;
  console.log(usercontext);

  const navigate = useNavigate();

  const onClickSignUp = () => {
    navigate('/signup')
  }

  const onClickSignIn = () => {
    navigate('/login')
  }

  return (
    <>
    <Header>HOME</Header>
    

     {
      usercontext?.data?.logged_in == true ? (
        <>
        <div className="container flex mx-auto p-40 flex-col md:flex-row">
        <div className="">
        <h2 className="mt-6 text-9xl font-extrabold text-neutral-600">Glove</h2>
        </div>

        <div>
        <Link to="/users">ユーザー一覧ページです</Link>
    <br />
    <Link to="/signup">ユーザー登録ページです</Link>
    <br />
    <Link to="/login">ログインページです</Link>
    <br />
    <Link to="/chatrooms">chatroom</Link>
     
        </div>
        </div>
       
        </>
      ) : (
        <>
   
        <div className="flex-col md:flex-row">
        <div className="mt-28 ml-40">
        <h2 className="mt-6 text-9xl font-extrabold text-neutral-600">Glove</h2>
        <p></p>
        </div>

        <div className="h-96 w-80 mt-28 ml-40">
       

        <input onClick={onClickSignUp} value="Sign up" className="mt-5 flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"></input>

        <input onClick={onClickSignIn} value="Sign in" className="mt-5 flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"></input>
        </div>
        </div>
  
       
        </>
      )
     }
    </>
  )
};
