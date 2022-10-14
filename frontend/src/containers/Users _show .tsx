import { match } from "assert";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsersShow } from "../apis/users_id";


type Userstype = {
  created_at: string;
  email: string;
  gender: string;
  id: number;
  name: string;
  password_digest: string;
  profile_image: string;
  self_introduction: string;
  updated_at: string;
}




export const UsersShow = () => {

  const navigate = useNavigate();



  const [state, setState] = useState<Userstype | null>(null);

  const  { id } = useParams<{ id: any }>();


  const onClickEdit = () => {
    navigate('/:id/edit')
  }
  

  useEffect(() => {
    fetchUsersShow(id)
    .then((data) =>{
      setState(data.user)
    }
     
    )
  }, []);


 



  return (
    <>
    <p>showページです</p>
    <ul>
      <li>name:{state?.name}</li>
      <li>email:{state?.name}</li>
      <li>gender:{state?.gender}</li>
      <li>self_introduction:{state?.self_introduction}</li>
    </ul>

    <button onClick={onClickEdit}>編集する</button>
  
     
    </>
  )
};
