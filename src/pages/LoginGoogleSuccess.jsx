import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginGoogleSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('authToken',token);
      navigate('/')
    }
  },[location])
  return (
    <div>Connexion en cours......</div>

  )
}
