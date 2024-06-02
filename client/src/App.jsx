import React, { useState } from 'react';
import Chat from './frontend/chat';
//import Calendar from './frontend/calendar';
import { Route, Routes }from 'react-router-dom';
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Navbar from './frontend/navbar';
import Forms from './frontend/forms';
import ImageUploader from './frontend/imageUploader';
import Welcome from './frontend/welcome';
function App() {
 

  return (  
      <MantineProvider>
        <Navbar />
        <Routes>
          <Route path='*' Component={Forms} />
          <Route path='/chat' Component={Chat}/>
          {/* <Route path='/calendar' Component={Calendar}/> */}
          <Route path='/imageUploader' Component={ImageUploader}/>
          <Route path='/welcome' Component={Welcome}/>
        </Routes>
      </MantineProvider>
  );
}

export default App;

 