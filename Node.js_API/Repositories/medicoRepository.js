var config = require('./../config');
const sql = require('mssql/msnodesqlv8');
var TbMedicoEspecial = require('./medicoEspecialidadeRepository')
async function Login(item) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('email', sql.VarChar, item.Email)
            .input('senha', sql.VarChar, item.Senha)
            .query("SELECT * from Tb_Medicos where Email = @email AND Senha = @senha;");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function Get() {
    try {
        let pool = await sql.connect(config);
        let especialidades = await pool.request().query("SELECT * FROM Tb_Medicos;");
        return especialidades.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function GetById(Id) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, Id)
            .query("SELECT * from Tb_Medicos where Id = @input_parameter;");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function GetByCrm(Id) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.VarChar, Id)
            .query("SELECT * from Tb_Medicos where CRM = @input_parameter;");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function Post(item) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('nome', sql.NVarChar, item.Nome)
            .input('email', sql.NVarChar, item.Email)
            .input('crm', sql.NVarChar, item.CRM)
            .input('senha', sql.NVarChar, item.Senha)
            .input('dataNascimento', sql.DateTime, item.DataNascimento)
            .input('fixo', sql.NVarChar, item.TelefoneFixo)
            .input('celular', sql.NVarChar, item.TelefoneCelular)
            .input('cep', sql.NVarChar, item.Cep)
            .input('logradouro', sql.NVarChar, item.Logradouro)
            .input('bairro', sql.NVarChar, item.Bairro)
            .input('localidade', sql.NVarChar, item.Localidade)
            .input('uf', sql.NVarChar, item.Uf)
            .input('numero', sql.NVarChar, item.Numero)
            .input('tipo', sql.Int, item.IdTipoUsuario)
            .query("INSERT Tb_Medicos(Nome,Email,CRM,Senha,DataNascimento,TelefoneFixo,TelefoneCelular,Cep,Logradouro,Bairro,Localidade,Uf,Numero,IdTipoUsuario)VALUES(@nome,@email,@crm,@senha,@dataNascimento,@fixo,@celular,@cep,@logradouro,@bairro,@localidade,@uf,@numero,@tipo);");

            GetByCrm(item.CRM).then(result =>{
                console.log(result)
                item.Especialidades.forEach(element => {
                   let ob = {IdMedico: result[0][0].ID, IdEspecialidade: element.IdEspecialidade}
                   TbMedicoEspecial.Post(ob);
                }); 
             }) 
        return product.recordsets;        
    }
    catch (err) {
        console.log(err);
    }
}


async function Delete(Id) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, Id)
            .query("DELETE FROM Tb_Medicos WHERE Id = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function Put(item) {
    var obj = await GetById(item.ID);   
    if(obj[0][0] != undefined){
    try {

        let pool = await sql.connect(config);
        let product = await pool.request()
        .input('Id', sql.Int, item.ID)
        .input('nome', sql.NVarChar, item.Nome)
        .input('email', sql.NVarChar, item.Email)
        .input('crm', sql.NVarChar, item.CRM)
        .input('senha', sql.NVarChar, item.Senha)
        .input('dataNascimento', sql.DateTime, item.DataNascimento)
        .input('fixo', sql.NVarChar, item.TelefoneFixo)
        .input('celular', sql.NVarChar, item.TelefoneCelular)
        .input('cep', sql.NVarChar, item.Cep)
        .input('logradouro', sql.NVarChar, item.Logradouro)
        .input('bairro', sql.NVarChar, item.Bairro)
        .input('localidade', sql.NVarChar, item.Localidade)
        .input('uf', sql.NVarChar, item.Uf)
        .input('numero', sql.NVarChar, item.Numero)
        .query("UPDATE Tb_Medicos SET Nome = @nome, Email = @email,CRM = @crm, Senha = @senha,DataNascimento = @dataNascimento,TelefoneFixo = @fixo,TelefoneCelular = @celular,Cep = @cep, Logradouro = @logradouro, Bairro = @bairro, Localidade = @localidade, Uf = @uf, Numero = @numero WHERE Id = @Id");
        return product.recordsets;        
    }
    catch (err) {
        console.log(err);
    }
    }else{
        return "Não encontrado!!!";
    }

}

module.exports = {
    Get: Get,
    GetById: GetById,
    Post: Post,
    Delete: Delete,
    Put: Put,
    Login: Login,
    GetByCrm: GetByCrm
}