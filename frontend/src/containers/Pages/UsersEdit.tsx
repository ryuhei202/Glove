// import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { updateUser } from "../../apis/users_update";
import { Header } from "../Templetes/Header";
import { CurrentUser, UpDateUser } from "../../interfaces";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";


export const UsersEdit= (props:any) => {

  const navigate = useNavigate();

  const usercontext:CurrentUser = useContext(UserContext).currentUserInfo;
  console.log(usercontext);

  //showページのuseNvigateからstateを引き継ぐ
  const { state } = useLocation();
  const [image, setImage] = useState<File>()
  
  //useFormを利用
  const { register, handleSubmit, formState: { errors } } = useForm(); 

  //idを取得
  const  { id } = useParams<{ id: any }>();

  const onSubmit:SubmitHandler<any>  = (data) => {
    //ボタンが押されたときの処理。patchリクエストを送る
    const params = createFormData(data);
  updateUser(id,params).then((data) => {
    console.log(data)
    localStorage.clear();
    localStorage.setItem("current_user",JSON.stringify({data}));
    navigate(`/users/${id}`);
    window.location.reload();
  }).catch((error)=>{
      console.log(error);
    })

  console.log(data)

  }

  //認可処理
useEffect(()=>{
  if (localStorage.getItem("current_user") == null) {
    navigate('/login')
  }
},[])
//currentuser以外が他のuserの編集画面にアクセスした時
useEffect(()=>{
  if( id != usercontext?.data.user.id ){
 navigate("/")
  }
})

console.log(state)

const uploadImage = useCallback((e:any) => {
  const file = e.target.files[0]
  setImage(file)
}, [])

 // FormData形式でデータを作成
 const createFormData = (data:any): FormData => {
  const formData = new FormData()

  formData.append("user[name]", data.name)
  formData.append("user[gender]", data.gender)
  formData.append("user[self_ingroduction]", data.self_introduction)
  if (image) formData.append("user[profile_image]", image)

  return formData
}


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

        <h4>self_introduction: </h4>
        <input { ...register('self_introduction')} />
        { errors.self_introduction && <span>自己紹介を入れてください</span> } 
        
        <input
              accept="image/*"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e)
              }}
            />
        <div>
            <input type="submit" value="Submit"></input>
        </div>
    </form>



     
    </>
  )
};
