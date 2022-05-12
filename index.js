const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.post("/card", (req, res)=> {
    const responseSuccess={
        success:true,
        cardURL: "https://awesome-profile-cards.herokuapp.com/card"
    }
    const responseError={
        success:false,
        error:"faltan datos"
    }
    res.json();
});