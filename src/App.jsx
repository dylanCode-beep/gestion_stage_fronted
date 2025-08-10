import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/DashboardLayout';
import Users from './pages/Users';
import Stagiaires from './pages/Stagiaires';
import Cellules from './pages/Cellules';
import Encadreurs from './pages/Encadreurs';
import ForgotPassword from './pages/ForgotPassword';
import UserProfil from './pages/UserProfil';
import LoginGoogleSuccess from './pages/LoginGoogleSuccess';

function App() {


  return (

      <BrowserRouter>

      <Routes>
        <Route path='/' element={<DashboardLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/stagiaires' element={<Stagiaires/>}/>
          <Route path='/encadreurs' element={<Encadreurs/>}/>
          <Route path='/cellules' element={<Cellules/>}/>
          <Route path='user/profil' element={<UserProfil/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
        <Route path='/login-success' element={<LoginGoogleSuccess/>}></Route>
      </Routes>

      </BrowserRouter>
  );
}

export default App
