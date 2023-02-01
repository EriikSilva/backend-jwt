<div align="center">
  <a href="https://github.com/EriikSilva/crud-primeng-node"><img alt="hits" src="https://hits.sh/github.com/EriikSilva/crud-primeng-node.svg"></a>
  <a href="https://github.com/EriikSilva/crud-primeng-node/graphs/commit-activity"><img src="https://img.shields.io/github/last-commit/EriikSilva/crud-primeng-node"></a>
  <a href="https://github.com/EriikSilva/crud-primeng-node"><img src="https://img.shields.io/badge/
  -InProgress-yellow"></a>
  <a href="https://github.com/EriikSilva/crud-primeng-node/stargazers"><img src="https://img.shields.io/github/stars/EriikSilva/crud-primeng-node?style=social"></a>
  <a href="https://github.com/EriikSilva/crud-primeng-node/network/members"><img src="https://img.shields.io/github/forks/EriikSilva/crud-primeng-node?style=social"></a>
  <a href="https://github.com/EriikSilva"><img src="https://img.shields.io/github/followers/EriikSilva?style=social"></a>
</div>



# 💬 Sobre
Projeto que busca adicionar jwt(jsonwebtoken) no backend juntamente com Mysql
<br>
- OBS: Criei um frontend para esse projeto => https://github.com/EriikSilva/front-jwt
- Back-end:node com express, bcrypt, jwt e mysql.


<b>Features com PostMan ou Insomminia</b>
- USUÁRIOS
- GET ("http://localhost:3000/usuario/")
  - Visualizar id do usuário
  - Visualizar email do usuário
  - Visualizar nome do usuário
- POST ("http://localhost:3000/usuario/cadastro")
  - Cadastrar um usuario com email e senha criptografadas com Bcrypt
- POST (http://localhost:3000/usuario/login)
  - Serve para o front checar com o JWT se o email e senha são validas para o login e gera um token unico
- 
# 💾 Instalação
- Necessario Node e algum serviço para o mysql... (Xampp ou Wamp) eu usei o xampp
- Clonar o projeto ```git clone https://github.com/EriikSilva/backend-jwt.git```
- Rodar o comando pelo terminal na pasta do projeto ```npm install```
- Rodar o comando pelo terminal na pasta do projeto ```nodemon server.js```
- Pode ser usado para teste insmonia ou postman
- Mysql
  - Necessario criar uma database chamada ```jwt``` create database jwt ou mude o nome para a sua database no arquivo mysql.js
  - copie e cole os comandos do arquivo jwt.sql nessa database que estão pasta raiz desse projeto
  - OBS: Criei 2 tabelas ```usuarios``` e ```produtos``` a tabela de produtos foi usada para alguns testes mas pode ser ignorada
- Exemplos abaixo utilizando o postman


<h2>POST - Cadastrando Usuario</h2>
<img src="https://user-images.githubusercontent.com/61124602/216100366-a51bf071-6894-40a0-9c56-f1f805b8e0f4.png">
 
<h2>Usuário Cadastrado com Senha Criptografada no mysql</h2>
<img src="https://user-images.githubusercontent.com/61124602/216100233-7b405897-e28a-47fb-98d7-eec39e455ded.png">

<h2>POST - Autenticando Usuário e retornando token</h2>
<img src="https://user-images.githubusercontent.com/61124602/215962601-2185ba49-48cc-44f9-8769-ee64eb394c47.png">



