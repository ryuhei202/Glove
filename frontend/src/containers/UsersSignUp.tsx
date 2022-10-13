import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchpostUsers } from "../apis/users_signup";

type Inputs = {
  name: string;
  gender: string;
  email: string;
  password: string;
};


  


export const UsersSignUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();     

  const onSubmit:SubmitHandler<any> = (data) => { 
    fetchpostUsers({
      name: data.name,
      gender: data.gender,
      email: data.email,
      password: data.password,
    }).then(() => navigate('/users'))
  
   }  

  return (
    
    <>
   <p>ユーザー登録ページです</p>
    <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Name: </h4>
        <input {...register('name', { required: true })} />
        { errors.name && <span>名前は1文字以上</span> }

        <h4>gender: </h4>
        <select { ...register('gender', { required: true })} >
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
        { errors.gender && <span>genderを選択してください</span> } 
{/*          
        <h4>Nationality: </h4>
        <input { ...register('nationality', { required: true })} />
        { errors.email && <span>国籍を選択してください</span> }  */}

        <h4>email: </h4>
        <input { ...register('email', { required: true })} />
        { errors.email && <span>Emailを入力してください</span> } 

        <h4>password: </h4>
        <input { ...register('password', { required: true })} />
        { errors.password && <span>Passwordを入力してください</span> } 
        
        <div>
            <input type="submit" value="Submit"></input>
        </div>
    </form></>
   
  )
}

