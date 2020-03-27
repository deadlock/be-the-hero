const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // Importando o arquivo de rotas.

const app = express();

app.use(
  express.json()
); /* Pegando o body com json e convertendo em um objeto, importante que este código fique sempre ao inicio do código, acima das rotas. */

app.use(cors());

app.use(routes);

app.listen(3333, () => {
  console.log("Servidor no ar!");
});
