const express = require("express");
const bodyParser = require ("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.json({messagge: "Bienvenidos al servidor de aplicaciones"});
});

require('./routes/profesor.routes')(app);

app.listen(4000, ()=>{
    console.log("Servidor conectado en el puerto 4000");
});

