import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import { Users } from './containers/Pages/Users';
import { UsersShow } from './containers/Pages/UsersShow '

import { Top } from './containers/Pages/Top';

import { UsersSignUp } from './containers/Pages/UsersSignUp';
import { UsersEdit } from './containers/Pages/UsersEdit';
import { UsersLogin } from './containers/Pages/UsersLogin';
import { Page404 } from './containers/Pages/Page404';
import axios from 'axios';
import { usersLoggedin } from './urls';
import { Groupchat } from './containers/Pages/Groupchat';
import { ChatRooms } from './containers/Pages/ChatRooms';
import { Rooms } from './containers/Pages/Rooms';
import { UserContext, UserProvider } from './providers/UserProvider';


function App() {

  //ユーザーのログイン情報
   const [loggedInStatus, setLoggedInStatus] = useState<string>("未ログイン")
  const [user, setUser] = useState({})
  const setUserInfo:any = useContext(UserContext);
  const userInfo:any = useContext(UserContext);

  //ログイン機能
   const handleLogin = (data:any) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
    
  }
  //ログアウト機能
  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    setUser({})
  }
 
//ログイン状態をチェックできるサイクルを作成
  useEffect(() => {
    checkLoginStatus()
  },[])



   const checkLoginStatus = () => {
    axios.get(usersLoggedin, { withCredentials: true }).then(
      response => {
        console.log(response);
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
    <UserProvider>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Top user={user} loggedInStatus={loggedInStatus} />}/>

      <Route path='users' element={<Users user={user} loggedInStatus={loggedInStatus} handleLogout={handleLogout}/>}/>

      <Route path='users/:id' element={<UsersShow user={user}loggedInStatus={loggedInStatus} />}/>

      <Route path='signup' element={<UsersSignUp user={user} loggedInStatus={loggedInStatus} handleLogin={handleLogin} />}/>

      <Route path='login' element={<UsersLogin user={user} loggedInStatus={loggedInStatus} handleLogin={handleLogin} handleLogout={handleLogout}/>}/>

      <Route path='users/:id/edit' element={<UsersEdit user={user}loggedInStatus={loggedInStatus} />} />

      <Route path='groupchat' element={<Groupchat user={user} loggedInStatus={loggedInStatus} handleLogout={handleLogout} />} />

      <Route path='chatrooms' element={<ChatRooms user={user} loggedInStatus={loggedInStatus} handleLogout={handleLogout}/>}></Route>
      
      <Route path='chatrooms/:id' element={<Rooms user={user} loggedInStatus={loggedInStatus} handleLogout={handleLogout}/>}></Route>

     <Route path='*' element={<Page404 />} /></Routes>
    </BrowserRouter>
    </UserProvider>

    </>
  );
 }

export default App;
