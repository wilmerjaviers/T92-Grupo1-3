const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 3000;

app.use(express.json());

const libros = [];





app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});