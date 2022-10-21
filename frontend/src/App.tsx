import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Users } from './containers/Users';
import { UsersShow } from './containers/UsersShow '

import { Top } from './containers/Top';

import { UsersSignUp } from './containers/UsersSignUp';
import { UsersEdit } from './containers/UsersEdit';
import { UsersLogin } from './containers/UsersLogin';
import { Page404 } from './containers/Page404';

function App() {
  return (
    <>
    <BrowserRouter>
     
     

     <Routes>

      <Route path='/' element={<Top />}/>

      <Route path='users' element={<Users/>}/>
      <Route path='users/:id' element={<UsersShow />}/>
      <Route path='signup' element={<UsersSignUp />}/>
      <Route path='login' element={<UsersLogin />}/>
      <Route path='users/:id/edit' element={<UsersEdit />} />
      <Route path='*' element={<Page404 />} />
     </Routes>
    </BrowserRouter>

    </>
     
   
   
  );
 }

export default App;
