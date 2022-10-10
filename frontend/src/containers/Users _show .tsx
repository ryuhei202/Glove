import { match } from "assert";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUsersShow } from "../apis/users_id";



export const UsersShow = () => {

  const  { id } = useParams<{ id: any }>();


  useEffect(() => {
    fetchUsersShow(id)
    .then((data) =>
      console.log(data)
    )
  }, [])



  return (
    <>
    <p>showページです</p>
     <p>パラメーターは{id}です。</p>
    </>
  )
};
