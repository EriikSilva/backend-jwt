const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyparser = require('body-parser');
const cors = require('cors')



//routes
const rotaUsuarios = require('./routes/usuarios')
const rotaProdutos = require('./routes/produtos')

app.use(morgan('dev'))
//body-parser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//cors
app.use(cors());
app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  });



app.use('/usuarios',rotaUsuarios)
app.use('/produtos', rotaProdutos);


app.use((req, res, next) => {
    const erro = new Error('Rota Não Encontrada ou conexão falhou');
    erro.status = 404;
    next(erro)
});

app.use((error, req, res,next) => {
    res.status(error.status|| 500)
    return res.send({
        erro:{
            message:error.message
        }
    })
})



module.exports = app;