
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
  const onClickUsers = () => {
    navigate('/users')
  }
  const onClickChat = () => {
    navigate('/chatrooms')
  }

  return (
    <>
    <Header>home</Header>
    

     {
      usercontext?.data?.logged_in == true ? (
        <>
        <div className="container justify-center flex p-5 flex-col md:flex-row items-center mt-24">
        <div className="">
        <h2 className="mt-6 text-9xl font-extrabold text-neutral-600 mx-10">Glove</h2>
        </div>

        <div className="w-80 mt-5  ">

        <div className="h-48 w-full checker-bg flex items-center justify-center p-4 text-blue-500">     
     <img className="rounded-full" src={usercontext.data?.user.profile_image?.url ? (usercontext.data?.user.profile_image?.url) : ("../icon/kkrn_icon_user_3.png")} width={180} height={180} /> 
   </div>
        <input onClick={onClickUsers} value="Users" className="mt-5 flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"></input>

        <input onClick={onClickChat} value="Chat" className="mt-5 flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"></input>
        </div>
        </div>
       
        </>
      ) : (
        <>
   
        <div className="container justify-center flex p-5 flex-col md:flex-row items-center mt-24">
        <div className="">
        <h2 className="text-9xl font-extrabold text-neutral-600  mx-10">Glove</h2>
        <p className=" ml-14 font-extrabold text-neutral-600 mt-4 w-60 ">You can connect with people from the same country.</p>
        </div>

        <div className="w-80 mt-5  ">
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
