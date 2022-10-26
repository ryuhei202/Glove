import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import { Users } from './containers/Users';
import { UsersShow } from './containers/UsersShow '

import { Top } from './containers/Top';

import { UsersSignUp } from './containers/UsersSignUp';
import { UsersEdit } from './containers/UsersEdit';
import { UsersLogin } from './containers/UsersLogin';
import { Page404 } from './containers/Page404';
import axios from 'axios';
import { usersLoggedin } from './urls';
import { Groupchat } from './containers/Groupchat';


function App() {

  //ユーザーのログイン情報
   const [loggedInStatus, setLoggedInStatus] = useState<string>("未ログイン")
  const [user, setUser] = useState({})

   const handleLogin = (data:any) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
  }
 
//ログイン状態をチェックできるサイクルを作成
  useEffect(() => {
    checkLoginStatus()
  })


   const checkLoginStatus = () => {
    axios.get(usersLoggedin, { withCredentials: true }).then(

    
     response => {
      if (response.data.logged_in && loggedInStatus === "未ログイン") {
        setLoggedInStatus("ログインなう")
        setUser(response.data.user)
      } else if (!response.data.logged_in && loggedInStatus === "ログインなう") {
        setLoggedInStatus("未ログイン")
        setUser({})
      }
    }
    ).catch(error => {
      console.log("ログインエラー", error)
    })
  }
    

  

  

  return (
    <>
    <BrowserRouter>
     
     

     <Routes>

      <Route path='/' element={<Top />}/>

      <Route path='users' element={<Users user={user} loggedInStatus={loggedInStatus} />}/>
      <Route path='users/:id' element={<UsersShow user={user}loggedInStatus={loggedInStatus} />}/>
      <Route path='signup' element={<UsersSignUp user={user} loggedInStatus={loggedInStatus} handleLogin={handleLogin} />}/>
      <Route path='login' element={<UsersLogin user={user} loggedInStatus={loggedInStatus} handleLogin={handleLogin} />}/>
      <Route path='users/:id/edit' element={<UsersEdit user={user}loggedInStatus={loggedInStatus} />} />
      <Route path='chat' element={<Groupchat user={user} loggedInStatus={loggedInStatus}/>} />
      <Route path='*' element={<Page404 />} />
     </Routes>
    </BrowserRouter>

    </>
     
   
   
  );
 }

export default App;
