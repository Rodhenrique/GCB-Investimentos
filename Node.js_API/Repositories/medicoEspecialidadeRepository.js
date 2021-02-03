var config = require('./../config');
const sql = require('mssql/msnodesqlv8');

async function Get() {
    try {
        let pool = await sql.connect(config);
        let especialidades = await pool.request().query("SELECT * FROM Tb_Medicos_Especialidades");
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
            .query("SELECT * from Tb_Medicos_Especialidades where Id = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function List(Id) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('idInput', sql.Int, Id)
            .query("SELECT Tb_Medicos_Especialidades.ID,Tb_Medicos_Especialidades.IdEspecialidade,Tb_Medicos_Especialidades.IdMedico,Tb_Especialidades.ID AS Id_Especialidade, Titulo FROM Tb_Medicos_Especialidades INNER JOIN Tb_Especialidades ON Tb_Especialidades.ID = Tb_Medicos_Especialidades.IdEspecialidade WHERE IdMedico = @idInput;");
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
            .input('medico', sql.Int, item.IdMedico)
            .input('especial', sql.Int, item.IdEspecialidade)
            .query("INSERT Tb_Medicos_Especialidades(IdMedico,IdEspecialidade)VALUES(@medico,@especial);");
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
            .query("DELETE FROM Tb_Medicos_Especialidades WHERE Id = @input_parameter");
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
        .input('medico', sql.Int, item.IdMedico)
        .input('especial', sql.Int, item.IdEspecialidade)
        .query("UPDATE Tb_Medicos_Especialidades SET IdEspecialidade = @especial, IdMedico = @medico WHERE Id = @Id");
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
    List: List
}