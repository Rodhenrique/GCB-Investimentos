--Usar o banco de dados criado
USE GcbCare
GO

--Inserindo dados na tabela tipo usuario
INSERT Tb_TipoUsuario(Titulo)
VALUES('Administrador'),
		('Medico'),
		('Usuario');
GO

--Inserindo dados na tabela especialidades
INSERT Tb_Especialidades(Titulo)
VALUES('ALERGOLOGIA'),
		('ANGIOLOGIA'),
		('BUCO MAXILO'),
		('CARDIOLOGIA CLÍNICA'),
		('CARDIOLOGIA INFANTIL'),
		('CIRURGIA CABEÇA E PESCOÇO'),
		('CIRURGIA CARDÍACA'),
		('CIRURGIA DE TÓRAX');
GO

INSERT Tb_Usuarios(Nome,Email,Cpf,Senha,IdTipoUsuario)
VALUES('Fabio Aurelio cunha','fabio@email.com','12345678910','12345',1),
('Maraisa Ribeiro Cunha', 'maraisa@email.com','9876543210','12345',1);

--Inserindo dados na tabela Usuarios
INSERT Tb_Medicos(Nome,Email,CRM,Senha,DataNascimento,TelefoneFixo,TelefoneCelular,Cep,Logradouro,Bairro,Localidade,Uf,Numero,IdTipoUsuario)
VALUES('Mario Jordão Da Silva','mariojordao@gmail.com','a932832','12345','26/10/1975','11328347283','11927378912','04576-020','Rua George Ohm','Cidade Monções','São Paulo','SP','206',2),
('Mariana Judas Suzana','marianajudas@gmail.com','a832293','12345','26/10/1981','11392341283','11913228273','04576-020','Rua George Ohm','Cidade Monções','São Paulo','SP','206',2);
GO

INSERT Tb_Medicos_Especialidades(IdMedico,IdEspecialidade)
VALUES(1,3),	
(1,2),
(1,5),
(1,7);
GO