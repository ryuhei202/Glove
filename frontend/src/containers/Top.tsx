import React from "react";
import { Link } from "react-router-dom";


export const Top = () => {
  return (
    <>
    <p>topページです</p>
    <Link to="/users">ユーザー一覧ページです</Link>
    <br />
    <Link to="/users/signup">ユーザー登録ページです</Link>
     
    </>
  )
};
