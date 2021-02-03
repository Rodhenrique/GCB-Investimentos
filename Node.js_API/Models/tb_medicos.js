class Medico{
    constructor(Id,Nome,Email,Crm,Senha,DataNascimento,TelefoneFixo,TelefoneCelular,Cep,Logradouro,Bairro,Localidade,Uf,Numero,IdTipoUsuario){
       this.Id = Id;
       this.Nome = Nome;
       this.Email = Email;
       this.Crm = Crm;
       this.Senha = Senha;
       this.DataNascimento = DataNascimento;
       this.TelefoneFixo = TelefoneFixo;
       this.TelefoneCelular = TelefoneCelular;
       this.Cep = Cep;
       this.Logradouro = Logradouro;
       this.Bairro = Bairro;
       this.Localidade = Localidade;
       this.Uf = Uf;
       this.Numero = Numero;
       this.IdTipoUsuario = IdTipoUsuario;
    }
}

module.exports = Medico;