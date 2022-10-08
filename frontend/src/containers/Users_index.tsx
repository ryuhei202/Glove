// ここではusers一覧を表示します。GET: /usersに反応

import React, { useEffect } from "react";
import { fetchUsers } from "../apis/users";

export const Users = () => {

  useEffect(() => {
    fetchUsers().then((data) => console.log(data)
    )
  }, [])
  return (

    <p>ユーザー一覧ページです</p>
  )
};
