import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Users } from './containers/Users_index';

import { Top } from './containers/Top';

function App() {
  return (
    <>
    <BrowserRouter>
     
     

     <Routes>
      <Route path='/' element={<Top />}/>
      <Route path='/users' element={<Users/>}/>
     </Routes>
    </BrowserRouter>

    </>
     
   
   
  );
 }

export default App;
