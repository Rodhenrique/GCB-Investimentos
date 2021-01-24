using GCB_Care_WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_CARE_API.Interfaces
{
    public interface IEspecialidades
    {
        /// <summary>
        /// Listar todas as especialidades
        /// </summary>
        List<TbEspecialidades> Get();

        /// <summary>
        /// Buscar uma especialidade pelo seu ID
        /// </summary>
        TbEspecialidades GetById(int id);

        /// <summary>
        /// Cadastrar uma especialidade
        /// </summary>
        void Post(TbEspecialidades especialidade);
        /// <summary>
        /// Atualizar uma especialidade 
        /// </summary>
        void Update(int id, TbEspecialidades especialidade);

        /// <summary>
        /// Deletar uma especialidade
        /// </summary>
        void Delete(int id);
    }
}
