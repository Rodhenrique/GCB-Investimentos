class Usuario{
    constructor(Id,Nome,Email,Senha,DataNascimento,Cpf,IdTipoUsuario){
       this.Id = Id;
       this.Nome = Nome;
       this.Email = Email;
       this.Cpf = Cpf;
       this.Senha = Senha;
       this.IdTipoUsuario = IdTipoUsuario;

    }
}

module.exports = Usuario;