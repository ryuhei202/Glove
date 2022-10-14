import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Users } from './containers/Users';
import { UsersShow } from './containers/Users _show '

import { Top } from './containers/Top';

import { UsersSignUp } from './containers/UsersSignUp';
import { UsersEdit } from './containers/Users_edit';

function App() {
  return (
    <>
    <BrowserRouter>
     
     

     <Routes>

      <Route path='/' element={<Top />}/>

      <Route path='users' element={<Users/>}/>
      <Route path='users/:id' element={<UsersShow />}/>
      <Route path='users/signup' element={<UsersSignUp />}/>
      <Route path='users/:id/edit' element={<UsersEdit />} />
     </Routes>
    </BrowserRouter>

    </>
     
   
   
  );
 }

export default App;
