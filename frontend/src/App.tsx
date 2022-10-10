import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Users } from './containers/Users';
import { UsersShow } from './containers/Users _show '

import { Top } from './containers/Top';

function App() {
  return (
    <>
    <BrowserRouter>
     
     

     <Routes>

      <Route path='/' element={<Top />}/>

      <Route path='users' element={<Users/>}/>
      <Route path='users/:id' element={<UsersShow />}/>

     </Routes>
    </BrowserRouter>

    </>
     
   
   
  );
 }

export default App;
