using System;
using System.Collections.Generic;

namespace GCB_Care_WebApi.Models
{
    public partial class TbEspecialidades
    {
        public TbEspecialidades()
        {
            TbMedicosEspecialidades = new HashSet<TbMedicosEspecialidades>();
        }

        public int Id { get; set; }
        public string Titulo { get; set; }

        public ICollection<TbMedicosEspecialidades> TbMedicosEspecialidades { get; set; }
    }
}
