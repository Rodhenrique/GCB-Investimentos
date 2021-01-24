using System;
using System.Collections.Generic;

namespace GCB_Care_WebApi.Models
{
    public partial class TbMedicosEspecialidades
    {
        public int Id { get; set; }
        public int? IdMedico { get; set; }
        public int? IdEspecialidade { get; set; }

        public TbEspecialidades IdEspecialidadeNavigation { get; set; }
        public TbMedicos IdMedicoNavigation { get; set; }
    }
}
