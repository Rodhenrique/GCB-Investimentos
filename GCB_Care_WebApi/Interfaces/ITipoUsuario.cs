using GCB_Care_WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_CARE_API.Interfaces
{
    public interface ITipoUsuario
    {
        /// <summary>
        /// Listar todos os tipos de usuários
        /// </summary>
        List<TbTipoUsuario> Get();

        /// <summary>
        /// Buscar um tipo de usuário
        /// </summary>
        TbTipoUsuario GetById(int id);

        /// <summary>
        /// Cadastrar um tipo de usuário
        /// </summary>
        void Post(TbTipoUsuario TipoUsuario);
        /// <summary>
        /// Atualizar um tipo de usuário 
        /// </summary>
        void Update(int id, TbTipoUsuario TipoUsuario);

        /// <summary>
        /// Deletar um tipo de usuário
        /// </summary>
        void Delete(int id);
    }

}
