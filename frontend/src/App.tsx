import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Users } from './containers/Users';

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
