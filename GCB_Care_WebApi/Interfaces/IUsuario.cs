using GCB_Care_WebApi.Models;
using GCB_Care_WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_CARE_API.Interfaces
{
    public interface IUsuario
    {
        /// <summary>
        /// Listar todos os usuários
        /// </summary>
        List<TbUsuarios> Get();

        /// <summary>
        /// Buscar um usuário
        /// </summary>
        TbUsuarios GetById(int id);

        /// <summary>
        /// Cadastrar um usuário
        /// </summary>
        void Post(TbUsuarios Usuario);
        /// <summary>
        /// Atualizar um usuário 
        /// </summary>
        void Update(int id, TbUsuarios Usuario);

        /// <summary>
        /// Deletar um usuário
        /// </summary>
        void Delete(int id);

        /// <summary>
        /// Buscar por email e senha
        /// </summary>
        TbUsuarios GetByEmailAndPass(LoginViewModel model);
    }
}
