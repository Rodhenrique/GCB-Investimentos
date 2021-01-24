import React, { useState } from 'react';
import './style.css';
import logo from '../../assets/imagens/logotipo.png';
import { useHistory } from 'react-router-dom';
import { stringify } from 'querystring';

function Login(){
    let history = useHistory();

    const [email, setEmail] = useState(""); 
    const [senha, setSenha] = useState(""); 

    const login =()=>{

        const login = {
            email: email,
            senha: senha
        };
        const url = "http://localhost:5000/api/Login";

        fetch(url,{
            method: 'POST',
            body: JSON.stringify(login),
            headers: {
                "content-type": "application/json", 
            },
        })
        .then((response) => response.json())
            .then((dados) => {
                if (dados.token != undefined) {
                    localStorage.setItem("Gcb-Caren-Token", dados.token); 
                    console.log(dados.token);
                    history.push("/Panel"); 
                } else alert("Email ou senha inválidos"); 
            })
            
            .catch((error) => console.error(error)); 
    };

    return(
    <div>
       <div className="login-container">
        <div className="login-panel">
            <form  onSubmit={(event) => {
                        event.preventDefault();
                        login();
                    }}>
                    <img className="logo" src={logo} alt="Logo da empresa"/>
                <div className="inputs-container d-flex flex-column">
                    <input name="email" type="email" placeholder="Digite seu email:" onChange={(e) => setEmail(e.target.value)}/>
                    <input name="senha" type="password" placeholder="Digite sua senha:" onChange={(e) => setSenha(e.target.value)} />
                </div>
                <input className="button-submit" value="Entrar" type="submit" />
            </form>
        </div>
    </div>
    </div>
);
}

export default Login;