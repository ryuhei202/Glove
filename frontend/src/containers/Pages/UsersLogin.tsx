import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchLogoutUser } from "../../apis/users_logout";
import { fetchLoginUser } from "../../apis/user_login";



export const UsersLogin = (props:any) => {

  const navigate = useNavigate();

  const handleSuccessfulAuthentication = (data:any) => {
    // props.history.push("/dashboard")
    // navigate()
    console.log(data)
    props.handleLogin(data);
    navigate(`/chatrooms`)
}

// const handleLogoutClick = () => {
//   fetchLogoutUser()
//   props.handleLogout()
//   navigate("/")

// }

  const { register, handleSubmit, formState: { errors } } = useForm();     

  const onSubmit:SubmitHandler<any> = (data) => {

    fetchLoginUser({
      email:data.email,
      password:data.password,
    }).then(data => {
      console.log(data)
      //ユーザー作成に成功した後の処理
      if (data.status === 'created' ) {
        
          handleSuccessfulAuthentication(data)
          
          // console.log(props.loggedInStatus)
        
      }

  }).catch(error => {
    console.log("registration error", error)
})
  }

  

  return (
    <>
  <p>ログインページです</p>
  <h2>ログイン状態: {props.loggedInStatus}</h2>
  <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Email: </h4>
        <input {...register('email', { required: true })} />
        { errors.email && <span>email1文字以上</span> }

        <h4>Password: </h4>
        <input {...register('password', { required: true })} />
        { errors.password && <span>パスワードは1文字以上</span> }
 
    <br />

    <div>
            <input type="submit" value="Submit"></input>
        </div>

 </form>
    </>
  )
};
