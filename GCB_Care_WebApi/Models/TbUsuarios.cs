using System;
using System.Collections.Generic;

namespace GCB_Care_WebApi.Models
{
    public partial class TbUsuarios
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
        public string Senha { get; set; }
        public int? IdTipoUsuario { get; set; }

        public TbTipoUsuario IdTipoUsuarioNavigation { get; set; }
    }
}
