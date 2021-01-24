--Criar banco de dados
CREATE DATABASE GcbCare
GO

--Usar o banco de dados criado
USE GcbCare
GO

--Criações das tabelas DLL
CREATE TABLE Tb_TipoUsuario (
	ID	INT PRIMARY KEY IDENTITY,
	Titulo			VARCHAR (120),
);
GO

CREATE TABLE Tb_Usuarios (
	ID	INT PRIMARY KEY IDENTITY,
	Nome			VARCHAR (120),
	Email			VARCHAR (120),
	Cpf			    VARCHAR (11),
	Senha			VARCHAR (120),
	IdTipoUsuario	INT FOREIGN KEY REFERENCES Tb_TipoUsuario(ID)
);
GO

CREATE TABLE Tb_Medicos (
	ID	INT PRIMARY KEY IDENTITY,
	Nome			VARCHAR (120),
	Email			VARCHAR (120),
	CRM			    VARCHAR (7),
	Senha			VARCHAR (120),
	DataNascimento	DATETIME,
	TelefoneFixo		VARCHAR(15),
	TelefoneCelular		VARCHAR(15),
	Cep	            VARCHAR (9),
	Logradouro	    VARCHAR (120),
	Bairro	        VARCHAR (120),
    Localidade	    VARCHAR (120),
	Uf	    VARCHAR (5),
    Numero	    VARCHAR (10),
	IdTipoUsuario	INT FOREIGN KEY REFERENCES Tb_TipoUsuario(ID)
);
GO

CREATE TABLE Tb_Especialidades(
	ID	INT PRIMARY KEY IDENTITY,
	Titulo VARCHAR(255)
);
GO

CREATE TABLE Tb_Medicos_Especialidades(
	ID	INT PRIMARY KEY IDENTITY,
	IdMedico	INT FOREIGN KEY REFERENCES Tb_Medicos(ID),
	IdEspecialidade INT FOREIGN KEY REFERENCES Tb_Especialidades(ID)
);
GO