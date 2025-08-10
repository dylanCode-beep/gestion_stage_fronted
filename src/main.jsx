import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {ChakraProvider} from '@chakra-ui/react'
import App from './App';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
     <React.StrictMode>
      <AuthProvider>
       <ChakraProvider>
      <ToastContainer/>
          <App/>
       </ChakraProvider>
       </AuthProvider>
    </React.StrictMode>
 
)
