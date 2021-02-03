var config = require('./../config');
const sql = require('mssql/msnodesqlv8');


async function Login(item) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('email', sql.VarChar, item.Email)
            .input('senha', sql.VarChar, item.Senha)
            .query("SELECT * from Tb_Usuarios where Email = @email AND Senha = @senha;");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function Get() {
    try {
        let pool = await sql.connect(config);
        let especialidades = await pool.request().query("SELECT * FROM Tb_Usuarios");
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
            .query("SELECT * from Tb_Usuarios where Id = @input_parameter");
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
            .input('cpf', sql.NVarChar, item.Cpf)
            .input('senha', sql.NVarChar, item.Senha)
            .input('tipo', sql.NVarChar, item.IdTipoUsuario)
            .query("INSERT Tb_Usuarios(Nome,Email,Cpf,Senha,IdTipoUsuario)VALUES(@nome,@email,@cpf,@senha,@tipo);");
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
            .query("DELETE FROM Tb_Usuarios WHERE Id = @input_parameter");
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
        .input('cpf', sql.NVarChar, item.Cpf)
        .input('senha', sql.NVarChar, item.Senha)
        .query("UPDATE Tb_Usuarios SET Nome = @nome, Email = @email, Cpf = @cpf, Senha = @senha WHERE Id = @Id");
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
    Login: Login
}