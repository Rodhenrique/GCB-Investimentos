using System;
using System.Collections.Generic;

namespace GCB_Care_WebApi.Models
{
    public partial class TbTipoUsuario
    {
        public TbTipoUsuario()
        {
            TbMedicos = new HashSet<TbMedicos>();
            TbUsuarios = new HashSet<TbUsuarios>();
        }

        public int Id { get; set; }
        public string Titulo { get; set; }

        public ICollection<TbMedicos> TbMedicos { get; set; }
        public ICollection<TbUsuarios> TbUsuarios { get; set; }
    }
}
