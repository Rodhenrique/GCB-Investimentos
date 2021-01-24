using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_Care_WebApi.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "É necessário informar um email.")]
        [DataType(DataType.EmailAddress)] 
        public string Email { get; set; } 

        [Required(ErrorMessage = "É necessário informar uma senha")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }
    }
}
