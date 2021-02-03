
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();


var TbEspecialidades = require('./Repositories/especialidadeRepository');
var TbMedicoEspecial = require('./Repositories/medicoEspecialidadeRepository');
var TbTipoUsuario = require('./Repositories/tipoUsuarioRepository')
var TbUsuario = require('./Repositories/usuarioRepository');
var TbMedico = require('./Repositories/medicoRepository');
const { json } = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('API SOLICITADA!!!');
   next();
})

//************************
// Login
//*********************/

router.route('/Login').post((request,response)=>{
   let order = {...request.body}
   
   if(order.Email != "" && order.Email != undefined && order.Senha != null && order.Senha != "" && order.Senha != undefined && order.Senha != null){
      TbMedico.Login(order).then(result =>{
         TbUsuario.Login(order).then(data =>{
            if(result[0][0] != undefined)
            {
               let code = jwt.sign({
                  Email: result[0][0].Email,
                  Jti: result[0][0].ID,
                  IdTipoUsuario: result[0][0].IdTipoUsuario
               }, 'GcbCare-key-autentication',{expiresIn: "1800s"}, { algorithm: 'RS256' })

               var toke = {token: code};
               return response.json(toke).status(200);

            }else if(data[0][0] != undefined){

               let code = jwt.sign({
                  Email: data[0][0].Email,
                  Jti: data[0][0].ID,
                  IdTipoUsuario: data[0][0].IdTipoUsuario
               }, 'GcbCare-key-autentication',{expiresIn: "1800s",issuer: 'GcbCare.WebApi.C#',audience: 'GcbCare.WebApi.C#'}, { algorithm: 'RS256' })
               var toke = {token: code};
               return response.json(toke).status(200);

            }else{
               return response.status(401).send('Email ou Senha invalidos!!!');
            }
         })
      })
   }else{
      return response.status(401).send('Email ou Senha invalidos!!!');
   }
})

//***********************************
//      Especialidades
 /************************************/

router.route('/Especialidade').get((request,response)=>{

  TbEspecialidades.Get().then(result => {
      return response.json(result[0]);
    })
    .catch(()=>{
     return response.status(404).send('Nenhuma especialidade encontrada');
    })

})

router.route('/Especialidade/:id').get((request,response)=>{

  TbEspecialidades.GetById(request.params.id).then(result => {
   return  response.json[result[0]].status(200);
  }).catch(()=>{
     return response.status(404).send("Nenhum especialidade encontrado");
  })
})

router.route('/Especialidade').post((request,response)=>{

    let order = {...request.body}

    TbEspecialidades.Post(order).then(result => {
       return response.status(201).send("Criado com sucesso!!!");
    }).catch(()=>{
      return response.status(401).send("Ocorreu algum erro!!!");
   })

})

router.route('/Especialidade/:id').delete((request,response)=>{

  TbEspecialidades.Delete(request.params.id).then(result => {
    return response.json(result[0]);
  }).catch(()=>{
    return response.status(404).send("Ocorreu algum problema!!!");
  })
})

router.route('/Especialidade').put((request,response)=>{

  let order = {...request.body}

  TbEspecialidades.Put(order).then(result => {
    return response.status(204).json(result);
  }).catch(()=>{
    return response.status(401).send("Ocorreu algum problema!!!");
  })

})

//*************************************** */
// Medico especialidade
///************************************* */

router.route('/MedicoEspecialidade').get((request,response)=>{

   TbMedicoEspecial.Get().then(result => {
      return response.status(200).json(result[0]);
     })
     .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
 
 })

 router.route('/MedicoEspecialidade/:id').get((request,response)=>{

   TbMedicoEspecial.GetById(request.params.id).then(result => {
      response.status(200).json(result[0][0]);
   })
   .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
 })

 
 router.route('/MedicoEspecialidade/List/:id').get((request,response)=>{

   TbMedicoEspecial.List(request.params.id).then(result => {
      return response.status(200).json(result[0]);
   })
   .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
 })


 router.route('/MedicoEspecialidade').post((request,response)=>{

   let order = {...request.body}

   TbMedicoEspecial.Post(order).then(result => {
      response.status(201).send("Criado com sucesso!!!");
   })
   .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
})

router.route('/MedicoEspecialidade/:id').delete((request,response)=>{

   TbMedicoEspecial.Delete(request.params.id).then(result => {
      response.status(200).json(result[0]);
   })
   .catch(()=>{
      return response.status(401).send("Não autorizado!!!");
   })
 })


 router.route('/MedicoEspecialidade').put((request,response)=>{

   let order = {...request.body}
 
   TbMedicoEspecial.Put(order).then(result => {
      response.status(204).json(result);
   })
   .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
 
 })

 /*****************************************************
  *  Tb_Medico
  * *************************************************** */

 router.route('/Medico').get((request,response)=>{

   TbMedico.Get().then(result => {
        response.status(201).json(result[0]);
     })
     .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
 
 })
 
 router.route('/Medico/:id').get((request,response)=>{
 
   TbMedico.GetById(request.params.id).then(result => {
      return response.status(200).json(result[0][0]);
   })
   .catch(()=>{
      return response.status(404).send("Não foi encontrado!!");
   })
 })
 
 router.route('/Medico').post((request,response)=>{
 
   let order = {...request.body}

   TbMedico.Post(order).then(result => {
      response.status(201).json(result);
   })
   .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
})
 
 router.route('/Medico/:id').delete((request,response)=>{
 
   TbMedico.Delete(request.params.id).then(result => {
      response.json(result[0]);
   })
   .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
 })
 
 router.route('/Medico').put((request,response)=>{
 
   let order = {...request.body}
 
   TbMedico.Put(order).then(result => {
      response.status(204).json(result);
   })
   .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
 })


 
   /*****************************************************
  *  Tb_TipoUsuario
  * *************************************************** */

 router.route('/TipoUsuario').get((request,response)=>{

   TbTipoUsuario.Get().then(result => {
       return response.status(200).json(result[0]);
     })
     .catch(()=>{
      return response.status(404).send("Não foi encontrado!!");
     })
 
 })
 
 router.route('/TipoUsuario/:id').get((request,response)=>{
 
   TbTipoUsuario.GetById(request.params.id).then(result => {
      return response.status(201).json(result[0][0]);
   })
   .catch(()=>{
      return response.status(404).send("Não foi encontrado!!");
     })
 })
 
 router.route('/TipoUsuario').post((request,response)=>{
 
     let order = {...request.body}
 
     TbTipoUsuario.Post(order).then(result => {
        response.status(201).json(result);
     })
     .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })

 
 })
 
 router.route('/TipoUsuario/:id').delete((request,response)=>{
 
   TbTipoUsuario.Delete(request.params.id).then(result => {
      return response.status(204).json(result[0]);
   })
   .catch(()=>{
      return response.status(401).send("Não foi encontrado!!");
     })
 })
 
 router.route('/TipoUsuario').put((request,response)=>{
 
   let order = {...request.body}
 
   TbTipoUsuario.Put(order).then(result => {
      response.status(204).json(result);
   })
   .catch(()=>{
      return response.status(401).send("Não foi encontrado!!");
     })
 })

/*****************************************************
*  Tb_Usuario
* *************************************************** */

router.route('/Usuario').get((request,response)=>{

   TbUsuario.Get().then(result => {
        return response.status(200).json(result[0]);
     })
     .catch(()=>{
      return response.status(404).send("Não foi encontrado!!");
     })
 
 })
 
 router.route('/Usuario/:id').get((request,response)=>{
 
   TbUsuario.GetById(request.params.id).then(result => {
     return response.status(204).json(result[0][0]);
   })
   .catch(()=>{
      return response.status(404).send("Não foi encontrado!!");
     })
 })
 
 router.route('/Usuario').post((request,response)=>{
 
     let order = {...request.body}
 
     TbUsuario.Post(order).then(result => {
        response.status(201).json(result);
     })
     .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
 })
 
 router.route('/Usuario/:id').delete((request,response)=>{
 
   TbUsuario.Delete(request.params.id).then(result => {
    return response.status(204).json(result[0]);
   })
   .catch(()=>{
      return response.status(404).send("Não foi encontrado!!");
     })
 })
 
 router.route('/Usuario').put((request,response)=>{
 
   let order = {...request.body}
 
   TbUsuario.Put(order).then(result => {
      response.status(204).json(result);
   })
   .catch(()=>{
      return response.status(401).send("Ocorreu algum problema!!!");
   })
 })

var port = 5000;
app.listen(port);
console.log('API is runnning at ' + port);