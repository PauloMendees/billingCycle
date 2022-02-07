import { Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Drawner from './components/Drawner/Drawner';
import AutenticacaoPage from './pages/Login/AutenticacaoPage';
import Rotas from './routes';

function App() {
  const tokenState = useSelector((state) => state.autenticacao.token)
  const [token, setToken] = useState('')
  const [token2, setToken2] = useState('')
  useEffect(() => {
    setToken(window.sessionStorage.getItem('jwt'))
    setToken2(window.localStorage.getItem('jwt'))
  }, [tokenState])

  return (
    <>
      {token || token2 ? (
        <Drawner>
          <Toolbar variant="dense" />
          <Rotas />
        </Drawner>
      ) : (
        <AutenticacaoPage />
      )}
    </>
  );
}

export default App;
