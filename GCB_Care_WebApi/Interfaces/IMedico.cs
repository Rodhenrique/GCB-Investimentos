using GCB_Care_WebApi.Models;
using GCB_Care_WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_CARE_API.Interfaces
{
    public interface IMedico
    {
        /// <summary>
        /// Listar todos os médico
        /// </summary>
        List<TbMedicos> Get();

        /// <summary>
        /// Buscar um médico pelo seu ID
        /// </summary>
        TbMedicos GetById(int id);

        /// <summary>
        /// Cadastrar um médico
        /// </summary>
        void Post(TbMedicos medico);

        /// <summary>
        /// Atualizar um médico
        /// </summary>
        void Update(int id, TbMedicos medico);

        /// <summary>
        /// Deletar um médico
        /// </summary>
        void Delete(int id);

        void DeleteEspecialidades(int id);


        /// <summary>
        /// Buscar por email e senha
        /// </summary>
        TbMedicos GetByEmailAndPass(LoginViewModel model);
    }
}
