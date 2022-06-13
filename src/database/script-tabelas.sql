-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */

create database icelog; 

use icelog;


create table empresa (
idEmpresa int primary key auto_increment,
cnpj char(14),
nomeEmpresa varchar(100),
cepEmpresa char(8),
numero int
);

desc empresa;

select * from empresa;

create table caminhao (
idCaminhao int primary key auto_increment,
marca varchar(100),
nomeCaminhao varchar(100),
placa char(7)
);

create table funcionario (
idFuncionario int auto_increment,
nome varchar(45),
email varchar(100),
senha varchar(100),
tipo int, constraint chkTipo check(tipo in (1, 2, 3)),
-- 1 = desenvolvedor
-- 2 = Empresa;
-- 3 = Funcionario;
fkEmpresa int,
foreign key (fkEmpresa) references Empresa(idEmpresa),
primary key (idFuncionario, fkEmpresa)
);

create table terceirizado (
idTerceirizado int
 auto_increment,
dtHora datetime default current_timestamp,
fkEmpresa int,
fkCaminhao int,
foreign key (fkEmpresa) references Empresa(idEmpresa),
foreign key (fkCaminhao) references Caminhao(idCaminhao),
primary key (idTerceirizado, fkEmpresa, fkCaminhao)
);

create table sensor (
idSensor int primary key auto_increment,
dtInstalacao datetime default current_timestamp,
fkCaminhao int,
foreign key (fkCaminhao) references Caminhao(idCaminhao)
);

create table dado (
idDado int auto_increment,
dtHora datetime default current_timestamp,
dht11_umidade DECIMAL,
dht11_temperatura DECIMAL,
luminosidade DECIMAL,
lm35_temperatura DECIMAL,
chave TINYINT,
fkSensor int,
foreign key (fkSensor) references Sensor(idSensor),
primary key (idDado, fkSensor)
);


insert into caminhao (marca, nomeCaminhao, placa) values 
('Um', 'Dois', 'Três'),
('Um', 'Dois', 'Três');


insert into terceirizado (fkEmpresa, fkCaminhao) values
(1, 2),
(1, 1);


insert into Sensor (fkCaminhao) values (1), (2);


insert into Dado (lm35_temperatura, fkSensor) values

(-5, 1),
(-1, 2),
(-2, 2),
(-4, 2),
(-1, 2);

SELECT
                        E.nomeEmpresa AS Empresa,
                        S.idSensor,
                            (SELECT
                                lm35_temperatura AS Temperatura
                                    FROM dado WHERE fkSensor = S.idSensor ORDER BY dtHora DESC LIMIT 1)
                            FROM empresa E
                                INNER JOIN terceirizado T
                                    ON E.idEmpresa = T.fkEmpresa
                                INNER JOIN caminhao C
                                    ON C.idCaminhao = T.fkCaminhao
                                INNER JOIN sensor S
                                    ON S.fkCaminhao = C.idCaminhao
                                INNER JOIN dado D
                                    ON D.fkSensor = S.idSensor
                                        WHERE 1=1
                                            GROUP BY
                                                E.nomeEmpresa,
                                                S.idSensor;




