import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Routes } from './config/Routes';
import { MenuProvider } from 'react-native-popup-menu';

const App =  () =>{
  
  
  
  return(
    <MenuProvider>
    <Routes  />
    </MenuProvider>
  )  
}

export default App