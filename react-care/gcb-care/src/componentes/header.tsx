import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../assets/imagens/logotipo.png';
import { parseJWT } from '../services/auth';
import { useHistory } from 'react-router-dom';

const Header = () =>{

  var idUser = localStorage.getItem("GCB-CAREN-ID-USER");
  useEffect(() => {
   getUser(idUser);
  }, [])

  let history = useHistory();

  const[nomeUser, setNomeUser] = useState('');

  const sair = () => {
    localStorage.removeItem('Gcb-Caren-Token');
    history.push('/');
}

const getUser =(id:any)=>{
  const url = "http://localhost:5000/api/Usuario/"+id+"";
  fetch(url,{
      method: 'GET'
  })
  .then((response) => response.json())
  .then((dados) => {
     setNomeUser(dados.nome)
  })
  .catch(err => {
      console.error(err);
  })
}

  const menu = () =>{

      if (parseJWT() == 1) {
      return(
      <div>
        <div className="header">
          <div className="ajuste">
          <a href={'/Panel'}><img className="logotipo" src={logo} alt="logotipo GCB Care"/></a>
          <h2>Seja Bem-vindo, {nomeUser}</h2>
          </div>
        
          <div className="header-right">
          <a className="active"onClick={e =>{
            e.preventDefault();
            sair();
          }}>Sair</a>
          </div>
        </div>
      </div>
    )
  }
  }
  return(
    <div>
      {
        menu()
      }
    </div>
  )

}

export default Header;