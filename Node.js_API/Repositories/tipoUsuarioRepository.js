var config = require('./../config');
const sql = require('mssql/msnodesqlv8');

async function Get() {
    try {
        let pool = await sql.connect(config);
        let especialidades = await pool.request().query("SELECT * FROM Tb_TipoUsuario");
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
            .query("SELECT * from Tb_TipoUsuario where Id = @input_parameter");
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
            .input('Titulo', sql.NVarChar, item.Titulo)
            .query("INSERT Tb_TipoUsuario(Titulo)VALUES(@Titulo);");
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
            .query("DELETE FROM Tb_TipoUsuario WHERE Id = @input_parameter");
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
        .input('Titulo', sql.NVarChar, item.Titulo)
        .query("UPDATE Tb_TipoUsuario SET Titulo = @Titulo WHERE Id = @Id");
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
    Put: Put
}