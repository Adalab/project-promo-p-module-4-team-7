const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
uuidv4();

const server = express();

server.use(cors());
server.use(express.json({
    limit: "10mb"
}));
server.set('view engine', 'ejs')
// Arrancamos el servividor en el puerto 4000
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const savedCards = [];
// Escribimos los endpoints que queramos
server.post("/card", (req, res) => {
  const requestData =
    req.body.name !== "" &&
    req.body.job !== "" &&
    req.body.photo !== "" &&
    req.body.email !== "" &&
    req.body.linkedin !== "" &&
    req.body.github !== "";
  if (requestData) {
    const newCard = { ...req.body, id: uuidv4() };
    savedCards.push(newCard);

    const responseSucess = {
      success: true,
      cardURL: `https://localhost:4000/card/${newCard.id}`,
    };
    res.json(responseSucess);
  } else {
    const responseError = {
      success: false,
      error: "Faltan datos",
    };
    res.json(responseError);
  }
});