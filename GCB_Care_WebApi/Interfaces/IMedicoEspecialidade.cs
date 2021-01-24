using GCB_Care_WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_CARE_API.Interfaces
{
    public interface IMedicoEspecialidade
    {
        /// <summary>
        /// Listar todas as especialidades dos médicos
        /// </summary>
        List<TbMedicosEspecialidades> Get();

        List<TbMedicosEspecialidades> ListById(int id);

        /// <summary>
        /// Buscar uma especialidade de um médico pelo seu ID
        /// </summary>
        TbMedicosEspecialidades GetById(int id);

        /// <summary>
        /// Cadastrar uma especialidade uma especialidade de médico
        /// </summary>
        void Post(TbMedicosEspecialidades especialidade);
        /// <summary>
        /// Atualizar uma especialidade de médico 
        /// </summary>
        void Update(int id, TbMedicosEspecialidades especialidade);

        /// <summary>
        /// Deletar uma especialidade de médico
        /// </summary>
        void Delete(int id);
    }
}
