CREATE TABLE usuarios (
  id_usuario int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL ,
  nome varchar(80) NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  senha varchar(100) NOT NULL,
) 


CREATE TABLE produtos (
  id_produto int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome_produto VARCHAR(200) NOT NULL,
  preco int(11) NOT NULL
)