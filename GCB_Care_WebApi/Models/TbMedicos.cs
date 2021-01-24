using System;
using System.Collections.Generic;

namespace GCB_Care_WebApi.Models
{
    public partial class TbMedicos
    {
        public TbMedicos()
        {
            TbMedicosEspecialidades = new HashSet<TbMedicosEspecialidades>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Crm { get; set; }
        public string Senha { get; set; }
        public DateTime? DataNascimento { get; set; }
        public string TelefoneFixo { get; set; }
        public string TelefoneCelular { get; set; }
        public string Cep { get; set; }
        public string Logradouro { get; set; }
        public string Bairro { get; set; }
        public string Localidade { get; set; }
        public string Uf { get; set; }
        public string Numero { get; set; }
        public int? IdTipoUsuario { get; set; }

        public TbTipoUsuario IdTipoUsuarioNavigation { get; set; }
        public ICollection<TbMedicosEspecialidades> TbMedicosEspecialidades { get; set; }
    }
}
