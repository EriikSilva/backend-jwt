CREATE TABLE usuarios (
  id_usuario int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL ,
  nome varchar(80) NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  senha varchar(100) NOT NULL
) 
