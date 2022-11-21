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
// useEffect(()=>{
//   if( id != usercontext?.data.user.id ){
//  navigate("/")
//   }
// })

const uploadImage = useCallback((e:any) => {
  const file = e.target.files[0]
  setImage(file)
}, [])

 // FormData形式でデータを作成
 const createFormData = (data:any): FormData => {
  const formData = new FormData()

  formData.append("user[name]", data.name)
  formData.append("user[self_introduction]", data.self_introduction)
  if (image) formData.append("user[profile_image]", image)

  return formData
}

console.log(usercontext?.data?.user.profile_image?.url)
 

  return (
    <>
      <Header>編集ページです</Header>
   
  

      {/* ここから */}


    <div className="mt-16 flex justify-center">

<div className="w-80 bg-white shadow rounded border border-transparent">
<div className="h-48 w-full checker-bg flex items-center justify-center p-4 text-blue-500">
     
      <img className="rounded-full" src={
        usercontext?.data?.user.profile_image?.url ? (usercontext?.data?.user.profile_image?.url) : ("../../icon/kkrn_icon_user_3.png")
        } width={180} height={180} />
     
    </div>

<div className="p-4 border-t border-gray-200">
  <form onSubmit={handleSubmit(onSubmit)}>
  <label className="mt-3 block text-sm font-medium text-neutral-600"> Name </label>
        <input placeholder="Your Name" className="mt-2 block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"{...register('name', { required: true })} />
        { errors.name && <span>名前は1文字以上</span> }

        <label className="mt-3 block text-sm font-medium text-neutral-600"> Self introduction </label>
        <input placeholder="よろしくお願いします" className="mt-2 block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"{ ...register('self_introduction')} />
        { errors.self_introduction && <span>自己紹介を入れてください</span> } 

        <label className="mt-3 block text-sm font-medium text-neutral-600"> Avatar </label>
        <input className="mt-3"
              accept="image/*"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e)
              }}
            />
        <div>
        <input type="submit" value="Submit" className="mt-5 flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></input>
        </div>
    </form>
 
 

</div>
</div>
</div>

     
    </>
  )
};
