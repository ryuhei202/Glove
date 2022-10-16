import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchpostUsers } from "../apis/users_signup";


  


export const UsersSignUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();     

  const onSubmit:SubmitHandler<any> = (data) => { 
    fetchpostUsers({
      name: data.name,
      gender: data.gender,
      language: data.language,
      email: data.email,
      password: data.password
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

        <h4>language: </h4>
        <select { ...register('language', { required: true })} >
          <option value="japanese">japanese</option>
          <option value="chinese">chinese</option>
          <option value="english">english</option>
          <option value="russian">russian</option>
          <option value="romanian">romanian</option>
          <option value="lithuania">lithuania</option>
          <option value="latvian">latvian</option>
          <option value="portuguese">portuguese</option>
          <option value="polish">polish</option>
          <option value="bulgarian">bulgarian</option>
          <option value="french">french</option>
          <option value="finnish">finnish</option>
          <option value="hungarian">hungarian</option>
          <option value="turkish">turkish</option>
          <option value="german">german</option>
          <option value="danish">danish</option>
          <option value="czech">czech</option>
          <option value="slovenian">slovenian</option>
          <option value="slovakian">slovakian</option>
          <option value="spanish">spanish</option>
          <option value="swedish">swedish</option>
          <option value="greek">greek</option>
          <option value="dutch">dutch</option>
          <option value="estonian">estonian</option>
          <option value="ukrainian">ukrainian</option>
          <option value="indonesian">indonesian</option>
          <option value="italian">italian</option>
        </select>
        { errors.gender && <span>languageを選択してください</span> } 
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
        
        {/* <h4>password_confirmation: </h4>
        <input { ...register('password_confirmation', { required: true })} />
        { errors.password_confirmation && <span>Passwordをもう一度入力してください</span> }  */}
        
        <div>
            <input type="submit" value="Submit"></input>
        </div>
    </form></>
   
  )
}

