
import { userInfo } from "os";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchLogoutUser } from "../../apis/users_logout";
import { fetchLoginUser } from "../../apis/user_login";
import { UserContext } from "../../providers/UserProvider";
import { Header } from "../Templetes/Header";

export const UsersLogin = (props:any) => {

  const navigate = useNavigate();

  const handleSuccessfulAuthentication = (data:any) => {
    props.handleLogin(data);
    navigate(`/chatrooms`)
}

  const { register, handleSubmit, formState: { errors } } = useForm();     

  const onSubmit:SubmitHandler<any> = (data) => {

    fetchLoginUser({
      email:data.email,
      password:data.password,
    }).then(data => {
      console.log(data)
      if (data.status === 'created' ) {
        handleSuccessfulAuthentication(data) 
      }
  }).catch(error => {
    console.log("registration error", error)
})
  }


  return (
    <>
   <Header>ログインページです</Header>
  <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Email: </h4>
        <input {...register('email', { required: true })} />
        { errors.email && <span>email1文字以上</span> }

        <h4>Password: </h4>
        <input  {...register('password', { required: true })}  type="password"/>
        { errors.password && <span>パスワードは1文字以上</span> }
 
    <br />

    <div>
            <input type="submit" value="Submit"></input>
        </div>

 </form>
    </>
  )
};
