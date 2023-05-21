import React, { useContext, useEffect, useRef, useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Conversation from './Pages/Conversation/Conversation.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Register from "./Pages/Register/Register";
import Login from "./Pages/login/Login";
function App() {
  const [dark,setdark]=React.useState(true)
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});
  const darkmo=()=>{
    if(dark){
      setdark(false)
    }
    else{
      setdark(true)
    }
    
    }
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Login/>}/>
   <Route path="/convo" element={<Conversation/>}/>
   <Route path="/register" element={<Register/>}/>
   </Routes>
   </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
