import React, { useEffect, useState } from 'react';
import './style.css';
import close from '../../assets/imagens/close.svg';
import settigs from '../../assets/imagens/settigs.svg';
import lupa from '../../assets/imagens/lupa.svg';
import { useHistory } from 'react-router-dom';
import Header from '../../componentes/header';

function Panel(){
    let history = useHistory();

    const [medicos, setMedicos] = useState([]); 
    const [medicoNome, setmedicoNome] = useState(''); 
    const [botao, setBotao] = useState(''); 
    const [nome, setNome] = useState(''); 
    const[email,setEmail] = useState('');
    const[crm, setCrm] = useState('');
    const[senha, setSenha] = useState('');
    const[dataNascimento, setData] = useState('');
    const[teleFixo, setTeleFixo] = useState('');
    const[celular, setCelular] = useState('');
    const[cep, setCep] = useState('');
    const[logradouro, setLogradouto] = useState('');
    const[bairro, setBairro] = useState('');
    const[localidade,setLocalidade] = useState('');
    const[uf,setUf] = useState('');
    const[numero, setNumero] = useState('');
    const [showModal, setShowModel] = useState(false); 
    const[especialidades, setEspecialidade] = useState([] as any);
    const[status, setStatus] = useState(false);
    const[id, setId] = useState('');
    const[itemEspecial, setItemEspecial] = useState('');
    const[selects, setSelects] = useState([] as any);
    const[medicoEspecialidades, setMedicoEspecialidades] = useState([] as any);


    useEffect(() => {
       Listar();
    }, []);

    const Salvar =()=>{
        var metodo = ""
        var url = "";
        if(status == false){
            metodo = "PUT";
            url = "http://localhost:5000/api/Medico/"+id+"";
        }else if(status == true){
            metodo = "POST";
            url = "http://localhost:5000/api/Medico";
        }

        var macro = [] as any;
        medicoEspecialidades.map((item:any) =>{
            macro.push({IdEspecialidade: item.id})
        })
        console.log(macro);

        const user={
            Nome: nome,
            Email: email,
            Crm: crm,
            Senha: senha,
            DataNascimento: "1981-01-23T04:45:33.857Z",
            TelefoneFixo: teleFixo,
            TelefoneCelular: celular,
            Cep: cep,
            Logradouro: logradouro,
            Bairro: bairro,
            Localidade: localidade,
            Uf: uf,
            Numero: numero,
            IdTipoUsuario: 2,
            TbMedicosEspecialidades: macro
        }

        console.log(JSON.stringify(user))
        fetch(url,{
             headers: {
                'Content-Type': 'application/json'
                //   authorization: 'Bearer ' + localStorage.getItem('Gcb-Caren-Token')
                },
            method: metodo,
            body: JSON.stringify(user)
        })
        .then(() => window.location.reload())
        .catch((error) => console.error(error)); 

    };
    const Listar = () =>{

        const url = "http://localhost:5000/api/Medico";
        fetch(url,{
            // headers: {
                //   authorization: 'Bearer ' + localStorage.getItem('Gcb-Caren-Token')
                //},
                method: 'GET',
            })
            .then((response) => response.json())
            .then((dados) => {
                setMedicos(dados);
                console.log(dados);
            })
            .catch((error) => console.error(error));

    fetch('http://localhost:5000/api/Especialidade',{
        // headers: {
            //   authorization: 'Bearer ' + localStorage.getItem('Gcb-Caren-Token')
            //},
            method: 'GET',
        })
        .then((response) => response.json())
        .then((dados) => {
            setSelects(dados);
        })
        .catch((error) => console.error(error));
    };

    const removeEspecialidade = (idEspecialidade:any) =>{
        let resposta = window.prompt("Digite 'excluir especialidade' para excluir essa especialidade desse médico(a):")?.toLowerCase();

        if(resposta == "excluir especialidade"){
            document.getElementById('card-item'+idEspecialidade+'')?.remove();

            const url = "http://localhost:5000/api/MedicoEspecialidade/" + idEspecialidade;
            fetch(url,{
                //headers: {
                  //     authorization: 'Bearer ' + localStorage.getItem('Gcb-Caren-Token')
                    //},
                method: 'DELETE'
            })
            .then(() => {
                Listar();
            })
            .catch(err => {
                console.error(err);
            })
        }
    }

    const removeContainer = (idEspecialidade:any) =>{
        document.getElementById('card-item-temp'+idEspecialidade+'')?.remove();
    }


    const modal =(id:any)=>{
        if(id !== null && id !== 0){
            const url = "http://localhost:5000/api/Medico/"+id;
            fetch(url,{
                 //headers: {
                  //     authorization: 'Bearer ' + localStorage.getItem('Gcb-Caren-Token')
                    //},
                    method: 'get'
            })
            .then((response) => response.json())
            .then((dados) => {
                setNome(dados.nome);
                setEmail(dados.email);
                setCrm(dados.crm);
                setSenha(dados.senha);
                setData(dados.dataNascimento);
                setTeleFixo(dados.telefoneFixo);
                setCelular(dados.telefoneCelular);

                setCep(dados.cep);
                setLogradouto(dados.logradouro);
                setBairro(dados.bairro);
                setLocalidade(dados.localidade);
                setUf(dados.uf);
                setNumero(dados.numero);
                setId(dados.id);
            })
            .catch(err => {
                console.error(err);
            })

            fetch('http://localhost:5000/api/MedicoEspecialidade/List/id?id='+id+'',{
                method: 'GET'
            })
            .then((response) => response.json())
            .then((dados) => {
                console.log(dados)
                if(dados == "Nenhuma especialidade médica encontrada!!!")
                {
                    setEspecialidade([]);
                }
                else
                {
                    setEspecialidade(dados);
                }
            })
            .catch(err => {
                console.error(err);
            })
            setStatus(false);
            setBotao("Atualizar")
        }else{
            setBotao("Adicionar")
            setStatus(true);
            setNome('');
            setEmail('');
            setEmail('');
            setCrm('');
            setSenha('');
            setData('');
            setTeleFixo('');
            setCelular('');
            setCep('');
            setLogradouto('');
            setBairro('');
            setLocalidade('');
            setUf('');
            setNumero('');
            setEspecialidade([]);
            setMedicoEspecialidades([]);
        }
    }

    const viacep =(num:any)=>{
        const url = "https://viacep.com.br/ws/"+num+"/json/";
        fetch(url,{
            method: 'GET'
        })
        .then((response) => response.json())
        .then((dados) => {
            setLogradouto(dados.logradouro);
            setBairro(dados.bairro);
            setLocalidade(dados.localidade);
            setUf(dados.uf);
        })
        .catch(err => {
            console.error(err);
        })
    }


    const excluir =(id:any)=>{
        let resposta = window.prompt("Digite 'excluir medico' para excluir esse médico(a):")?.toLowerCase();

        if(resposta == "excluir medico"){
            const url = "http://localhost:5000/api/Medico/" + id;
            fetch(url,{
                //headers: {
                  //     authorization: 'Bearer ' + localStorage.getItem('Gcb-Caren-Token')
                    //},
                method: 'DELETE'
            })
            .then(() => {
                Listar();
            })
            .catch(err => {
                console.error(err);
            })
        }
    }

    const Adicionar = () =>{ 
       var itemBuscado = selects.filter((x:any) => x.id == itemEspecial);
       
       var idItem = Object.values(itemBuscado[0])[0];
       var tituloItem = Object.values(itemBuscado[0])[1];
       var obj = {id: idItem, titulo:tituloItem};
       setMedicoEspecialidades([ obj, ...medicoEspecialidades ]);
    }

    function Buscar(nome: string) { 
        if (medicos.length != 0) {
            var buscados = medicos.filter((item: any) => item.nome.toUpperCase().includes(nome.toUpperCase()));
            if (buscados != undefined)
                return buscados; 
        }
        return medicos; 
    }
    return(
        <div>
            <Header/>
        <div className="barra-cima">
            
        <div className="input-container">
            <input value={medicoNome} onChange={e => setmedicoNome(e.target.value)} className="input-field" type="text"  placeholder="Digite o nome do médico(a) para encontra-lo:" name="usrnm"/>
            <i className="fas fa-search icon"></i>
        </div>
        <button onClick={()=>{modal(0); setShowModel(true);}} className="btn">Adicionar médico(a)<i className="fas fa-plus icone"></i></button>
        </div>
        <div className="container">
  <ul className="responsive-table">
    <li className="table-header">
      <div className="col col-1">Nome do médico(a)</div>
      <div className="col col-2">CRM</div>
      <div className="col col-3">Ver mais</div>
      <div className="col col-4">Deletar</div>
    </li>
    {
    Buscar(medicoNome).map((item:any) =>{
        return(
            <li className="table-row">
            <div className="col col-1">{item.nome}</div>
            <div className="col col-2">{item.crm}</div>
            <div className="col col-3"><img className="regular" src={settigs} onClick={()=>{ modal(item.id); setShowModel(true);}} alt="configurações"/></div>
            <div className="col col-4"> <img className="regular" src={close} onClick={()=> excluir(item.id)} alt="excluir médico"/></div>
            </li>
            )
        })
    }
  </ul>
</div>

     <div style={{display: showModal? 'block' : 'none'}}>
     <div id="myModal" className="modal">
         <div className="modal-content">
         <span onClick={() => setShowModel(false)} className="close">&times;</span>
        <div className="containerInputs">
            <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
            >

        <div>
             <input type="text" onChange={e=> setNome(e.target.value)} maxLength={120} value={nome} placeholder="Nome" />
             <input type="text" onChange={e=> setCrm(e.target.value)} maxLength={7} value={crm} placeholder="CRM" />
         </div>
       
             
            <input type="email"  maxLength={120} onChange={e=> setEmail(e.target.value)} value={email} placeholder="E-mail"/>
            <div>
                <input type="text" maxLength={15} onChange={e=> setTeleFixo(e.target.value)} value={teleFixo} placeholder="Telefone fixo"/>
                <input type="text" maxLength={15} onChange={e=> setCelular(e.target.value)} value={celular} placeholder="Telefone celular" />
            </div>

            <div className="form-pass">
                <input type="password" maxLength={120} onChange={e=> setSenha(e.target.value)} value={senha} placeholder="Senha" />
                <input type="date" onChange={e=> setData(e.target.value)} value={dataNascimento.toString().slice(0,10)}/>
            </div>

            <div className="cep">
                <input type="text" maxLength={9} onChange={e=>{ viacep(e.target.value); setCep(e.target.value)}} value={cep} placeholder="CEP"/>
                <input type="text" maxLength={120} onChange={e=> setLogradouto(e.target.value)} value={logradouro} placeholder="Logradouro"/>
            </div>

            <div className="cep">
                <input type="text" maxLength={120} onChange={e=> setBairro(e.target.value)} value={bairro} placeholder="Bairro" />
                <input type="text" maxLength={120} onChange={e=> setLocalidade(e.target.value)} value={localidade} placeholder="Localidade"/>
            </div>

            <div className="cep">
                <input type="text" maxLength={5} onChange={e=> setUf(e.target.value)} value={uf} placeholder="UF"/>
                <input type="text" maxLength={10} onChange={e=> setNumero(e.target.value)} value={numero} placeholder="Número"/>
            </div>

            <h3>Especialidades</h3>
            <select name="especialidades" id="especial" onChange={e => setItemEspecial(e.target.value)}>
                <option selected={true} value="0" disabled>Selecione</option>
                {
                    selects.map((item:any) =>{
                        return(
                            <option id={item.id} value={item.id}>{item.titulo}</option>
                         )
                    })
                }
            </select>
              <button onClick={() => Adicionar()}>Adicionar</button>  

            <div className="cards-container">
            {
                especialidades.map((item:any)=>{
                    return(
                        <div className="cards" id={"card-item"+item.id+""}>{item.idEspecialidadeNavigation.titulo} 
                        <img className="regular" src={close} onClick={()=> removeEspecialidade(item.id)} alt="Excluir especialidade do médico(a)"/>
                        </div>
                        )
                    })
                    
                }
                {
                medicoEspecialidades.map((item:any)=>{
                    return(
                        <div className="cards" id={'card-item-temp'+item.id+''}>
                            {item.titulo}
                            <img className="regular" src={close} onClick={()=> removeContainer(item.id)} alt="Excluir especialidade do médico(a)"/>
                        </div>
                        )
                    })
                    
                }
            </div>
            <button onClick={() => Salvar()}>{botao}</button>
            </form>
        </div>
         </div>
     </div>
 </div>

    </div>
    );
}

export default Panel;