import React from "react";
import { useLocation } from "react-router-dom";


export const UsersEdit= () => {

  const { state } = useLocation();
  console.log(state);




  return (
    <>
    <p>{state}の編集ページです</p>


     
    </>
  )
};
