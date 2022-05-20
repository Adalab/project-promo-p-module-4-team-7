const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const Database = require('better-sqlite3');


const server = express();

server.use(cors());
server.use(express.json({
    limit: "10mb"
}));
server.set('view engine', 'ejs');


// Arrancamos el servividor en el puerto 4000
const serverPort = process.env.PORT || 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
const db = new Database('./src/db/cards.db');
// Listado de tarjetas
// const savedCards = [];

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
    const newCard = { 
      ...req.body, 
      id: uuidv4() 
    };
    // añadir al listado de tarjetas
    // savedCards.push(newCard);

    // insertar la tarjeta en la db
    const query = db.prepare('INSERT INTO card (palette, name, job, email, phone, linkedin, github, photo, uuid) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)');
    console.log(query);
    const result = query.run(
      newCard.palette,
      newCard.name,
      newCard.job,
      newCard.email,
      newCard.phone,
      newCard.linkedin,
      newCard.github,
      newCard.photo,
      newCard.id);

    // creo la respuesta
    const responseSuccess = {
      success: true,
      cardURL: `https://awesome-profile-cards-tbeach.herokuapp/card${newCard.id}`,
      
    };

    res.json(responseSuccess);
  } else {
    const responseError = {
      success: false,
      error: "Faltan datos",
    };

    res.json(responseError);
  }
});

server.get("/card/:id", (req, res) => {


  // console.log(req.params.id);
  // const userCard = savedCards.find((card) => card.id === req.params.id);

  const query =db.prepare('SELECT * FROM card WHERE uuid=?');
  const userCard = query.get(req.params.id)
  res.render('card', userCard);
});

// Para devolver un 404 not found

// server.get('*', (req, res) => {
//   const notFoundFileRelativePath = './public/404-not-found.html';
//   const notFoundFileAbsolutePath = path.join(
//     __dirname,
//     notFoundFileRelativePath
//   );
//   res.status(404).sendFile(notFoundFileAbsolutePath);
// });

const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

const staticServerCard = './src/staticStyle';
server.use(express.static(staticServerCard));