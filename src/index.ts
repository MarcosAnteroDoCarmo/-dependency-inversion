import bodyParser from "body-parser"
import express from "express"


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(router);

const porta = 3000
app.listen(porta, ()=>console.log(`Rodando na porta ${porta} !!`))

