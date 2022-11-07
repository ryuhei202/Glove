// import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { updateUser } from "../../apis/users_update";
import { Header } from "../Templetes/Header";
import { UpDateUser } from "../../interfaces";


export const UsersEdit= (props:any) => {

  const navigate = useNavigate();

  //showページのuseNvigateからstateを引き継ぐ
  const { state } = useLocation();
  
  //useFormを利用
  const { register, handleSubmit, formState: { errors } } = useForm(); 

  //idを取得
  const  { id } = useParams<{ id: any }>();

  const onSubmit:SubmitHandler<any>  = (data:UpDateUser) => {
    //ボタンが押されたときの処理。patchリクエストを送る
  updateUser(id,{
    name: data.name,
    gender: data.gender,
    self_introduction: data.self_introduction

  }).then(() => navigate(`/users/${id}`))

  console.log(data)

  }

console.log(state)


  return (
    <>
      <Header>編集ページです</Header>
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

        {/* <h4>email: </h4>
        <input { ...register('email', { required: true })} />
        { errors.email && <span>Emailを入力してください</span> }  */}

        {/* <h4>password: </h4>
        <input { ...register('password', { required: true })} />
        { errors.password && <span>Passwordを入力してください</span> } 
         */}
        <h4>self_introduction: </h4>
        <input { ...register('self_introduction')} />
        { errors.self_introduction && <span>自己紹介を入れてください</span> } 
        
        <div>
            <input type="submit" value="Submit"></input>
        </div>
    </form>


     
    </>
  )
};
