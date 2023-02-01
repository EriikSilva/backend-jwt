const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    conn.query(
      `
        SELECT * FROM usuarios
    `,
      (error, result, field) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        const response = {
          // quantidade_de_funcionarios: result.length,
          usuarios: result.map((usuario) => {
            return {
              id_usuario: usuario.id_usuario,
              email: usuario.email,
              request: {
                tipo: "GET",
                url:
                  "http://localhost:3000/usuario/" + usuario.id_usuario,
              },
            };
          }),
        };

        return res.status(200).send(response);
      }
    );
  });
});

router.post("/cadastro", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    //CHECANDO SE USER JA EXISTE
    conn.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [req.body.email],
      (error, result) => {
        if (error) {
          return res.status(500).send({ error: error });
        }

        if (result.length > 0) {
          res.status(409).send({
            message: "Usuario ja cadastrado",
          });
        } else {
          bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) {
              return res.status(500).send({ error: errBcrypt });
            }
            //CADASTRANDO
            conn.query(
              `
                      INSERT INTO usuarios (email, senha) VALUES (?,?)
                      `,
              [req.body.email, hash],
              (error, result) => {
                conn.release();
                if (error) {
                  return res.status(500).send({ error: error });
                }

                response = {
                  message: "Usuario criado com sucesso",
                  usuarioCriado: {
                    id_usuario: result.insertId,
                    email: req.body.email,
                  },
                };
                return res.status(201).send(response);
              }
            );
          });
        }
      }
    );
  });
});

router.post("/login", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    const query = `SELECT * FROM usuarios WHERE email = ?`;

    conn.query(query, [req.body.email], (error, result, fields) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      //checar se email existe
      if (result.length < 1) {
        return res.status(401).send({ message: "Falha na autenticação" });
      }
      bcrypt.compare(req.body.senha, result[0].senha, 
        (err, resultadoBcrypt) => {
        if (err) {
          return res.status(401).send({ message: "Falha na autenticação" });
        }else if (resultadoBcrypt) {
          //criação do token
        //   console.log(result[0].email)
          let token = jwt.sign({
            id_usuario: result[0].id_usuario,
            email:result[0].email,
          }, process.env.JWT_KEY,
          {
            expiresIn:"1h"
          });
                    
          res.status(200).send({ 
            message: "autenticado com sucesso",
            token:token,
            email:result[0].email
        });
        }else{
            return res.status(401).send({ message: "Falha na autenticação" });
        }     
      });
    });
  });
});


module.exports = router;
