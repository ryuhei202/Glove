import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate,  } from 'react-router-dom';
import { Users } from './containers/Pages/Users';
import { UsersShow } from './containers/Pages/UsersShow '

import { Top } from './containers/Pages/Top';

import { UsersSignUp } from './containers/Pages/UsersSignUp';
import { UsersEdit } from './containers/Pages/UsersEdit';
import { UsersLogin } from './containers/Pages/UsersLogin';
import { Page404 } from './containers/Pages/Page404';
import axios from 'axios';
import { usersLoggedin } from './urls';
import { GroupChatRoom } from './containers/Pages/Groupchat';
import { ChatRooms } from './containers/Pages/ChatRooms';
import { Rooms } from './containers/Pages/Rooms';
import { UserContext } from './providers/UserProvider';
import { ChatRoomsProvider } from './providers/ChatRoomsProvider';
import { LoggedInStatesContext } from './providers/LoggedInStatesProvider';
import { LogIn, LogInback, LogOut } from './interfaces';


function App() {

  //ユーザーのログイン情報
 
  // const navigate = useNavigate()
  const { setLoggedInStatus } = useContext(LoggedInStatesContext);
  const loggedincontext = useContext(LoggedInStatesContext);

  const { setCurrentUserInfo } = useContext(UserContext);
  const current_user = useContext(UserContext);
  console.log(current_user);
  console.log(localStorage.getItem("current_user"));

  //ログイン機能
   const handleLogin = (data:any) => {
    console.log(data)
    setLoggedInStatus("ログインなう")
    setCurrentUserInfo({ data });
    localStorage.setItem("current_user",JSON.stringify({data}));
    // navigate(`/groupchat/${data.user.language}`)
  }
  //ログアウト機能
  const handleLogout = (data:LogOut) => {
    // setLoggedInStatus("未ログイン")
    setCurrentUserInfo({data});
  }
  console.log(current_user.currentUserInfo)



  useEffect(()=>{
    const currentUser = localStorage.getItem("current_user");
    if (!currentUser) return;
    console.log(JSON.parse(currentUser));
    setCurrentUserInfo(JSON.parse(currentUser))
  },[])
 
    

  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Top   />}/>

      <Route path='users' element={<Users   handleLogout={handleLogout}/>}/>

      <Route path='users/:id' element={<UsersShow  />}/>

      <Route path='signup' element={<UsersSignUp   handleLogin={handleLogin} />}/>

      <Route path='login' element={<UsersLogin   handleLogin={handleLogin} handleLogout={handleLogout}/>}/>

      <Route path='users/:id/edit' element={<UsersEdit  />} />

      <Route path='groupchat/:language' element={<GroupChatRoom handleLogout={handleLogout} />} />

      <Route path='chatrooms' element={<ChatRooms  handleLogout={handleLogout}/>}></Route>
      
      <Route path='chatrooms/:id' element={<Rooms  handleLogout={handleLogout}/>}></Route>

     <Route path='*' element={<Page404 />} />
     </Routes>
    </BrowserRouter>
    </>
  );
 }

export default App;
