const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const login = require("../middleware/login");


router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    conn.query(
      `
        SELECT * FROM produtos
    `,
      (error, result, field) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        const response = {
          // quantidade_de_funcionarios: result.length,
          produtos: result.map((produto) => {
            return {
              id_produto: produto.id_produto,
              nome_produto: produto.nome_produto,
              preco: produto.preco,
              request: {
                tipo: "GET",
                url:
                  "http://localhost:3000/produto/" + produto.id_produto,
              },
            };
          }),
        };

        return res.status(200).send(response);
      }
    );
  });
});


router.post("/", login.obrigatorio, (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }

    conn.query(
      `INSERT INTO produtos (nome_produto, preco) VALUES (?, ?)`,
      [req.body.nome_produto, req.body.preco],
      (error, result) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null,
          });
        }
        const response = {
          cargoCriado: {
            message: "PRODUTO INSERIDO COM SUCESSO",
            nome_produto: req.body.nome_produto,
            preco:req.body.preco,
            request: {
              tipo: "POST",
              url: "http://localhost:3000/produtos/",
            },
          },
        };
        res.status(201).send(response);
      }
    );
  });
});

module.exports = router;
