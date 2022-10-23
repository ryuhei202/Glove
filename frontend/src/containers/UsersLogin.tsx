import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchLoginUser } from "../apis/user_login";



export const UsersLogin = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();     

  const onSubmit:SubmitHandler<any> = (data) => {

    fetchLoginUser({
      email:data.email,
      password:data.password
    }).then(() => navigate("/users"))
  }

  return (
    <>
  <p>ログインページです</p>
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
