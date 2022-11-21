import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchLogoutUser } from "../../apis/users_logout";
import { fetchLoginUser } from "../../apis/user_login";
import { LogIn, LogInback } from "../../interfaces";
import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";

export const UsersLogin = (props:any) => {

  const navigate = useNavigate();

  const current_user = useContext(UserContext);
  console.log(current_user);

  const handleSuccessfulAuthentication = (res:LogInback) => {
    props.handleLogin(res);

    navigate(`/groupchat/${res.user.language}`)
}

  const { register, handleSubmit, formState: { errors } } = useForm();     

  const onSubmit:SubmitHandler<any> = (data:LogIn) => {

    fetchLoginUser({
      email:data.email,
      password:data.password,
    }).then((res:LogInback) => {
      console.log(res)
      if (res.status === 'created' ) {
      console.log(res);
        handleSuccessfulAuthentication(res) 
      }
  }).catch(error => {
    console.log("registration error", error)
})
  }


  return (
    <>
   <Header>sign in</Header>

  <form onSubmit={handleSubmit(onSubmit)}>

  <div className=" items-center px-5 lg:px-20">
        <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
            <div className="mt-8">
                <div className="mt-6">
                <div className="mb-6">
                    
                    <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">Sign in.</h2>
                </div>
    <div className="">
        <label className="mt-3 block text-sm font-medium text-neutral-600"> Email address </label>
         <div className="mt-1">
            <input placeholder="Your Email" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" {...register('email', { required: true })} />
        { errors.email && <span>email1文字以上</span> }
          </div>
    </div>

    <div className="space-y-1 mt-3">
        <label className="block text-sm font-medium text-neutral-600"> Password </label>
          <div className="mt-1">
            <input placeholder="Your Password" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" {...register('password', { required: true })}  type="password"/>
        { errors.password && <span>パスワードは1文字以上</span> }
          </div>
    </div>

         <div>
            <input type="submit" value="Sign in" className="mt-5 flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></input>
        </div>
        </div>
        </div>
        </div>
        </div>

 </form>
    </>
  )
};


// <section class="">
//     <div class=" items-center px-5 py-12 lg:px-20">
//         <div class="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
//             <div class="mt-8">
//                 <div class="mt-6">
//                     <form action="#" method="POST" class="space-y-6">
//                         <div>
//                             <label for="email" class="block text-sm font-medium text-neutral-600"> Email address </label>
//                             <div class="mt-1">
//                                 <input id="email" name="email" type="email" autocomplete="email" required="" placeholder="Your Email" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
//                             </div>
//                         </div>

//                         <div class="space-y-1">
//                             <label for="password" class="block text-sm font-medium text-neutral-600"> Password </label>
//                             <div class="mt-1">
//                                 <input id="password" name="password" type="password" autocomplete="current-password" required="" placeholder="Your Password" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
//                             </div>
//                         </div>

//                         <div class="flex items-center justify-between">
//                             <div class="flex items-center">
//                                 <input id="remember-me" name="remember-me" type="checkbox" placeholder="Your password" class="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500">
//                                 <label for="remember-me" class="block ml-2 text-sm text-neutral-600"> Remember me </label>
//                             </div>

//                             <div class="text-sm">
//                                 <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a>
//                             </div>
//                         </div>

//                         <div>
//                             <button type="submit" class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign in</button>
//                         </div>
//                     </form>
//                     <div class="relative my-4">
//                         <div class="absolute inset-0 flex items-center">
//                             <div class="w-full border-t border-gray-300"></div>
//                         </div>
//                         <div class="relative flex justify-center text-sm">
//                             <span class="px-2 text-neutral-600 bg-white"> Or continue with </span>
//                         </div>
//                     </div>
//                     <div>
//                         <button type="submit" class="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
//                             <div class="flex items-center justify-center">
//                                 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48">
//                                     <defs>
//                                         <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path>
//                                     </defs>
//                                     <clipPath id="b">
//                                         <use xlink:href="#a" overflow="visible"></use>
//                                     </clipPath>
//                                     <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path>
//                                     <path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"></path>
//                                     <path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"></path>
//                                     <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"></path>
//                                 </svg>
//                                 <span class="ml-4"> Log in with Google</span>
//                             </div>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>
