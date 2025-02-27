const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 3000;

app.use(express.json());

const libros = [];



if (fs.existsSync('libros.json')) {
    const data = fs.readFileSync('libros.json');
    libros = JSON.parse(data);
}

app.post('/libros', (req, res) => {
    const { titulo, autor, anio, disponible } = req.body;

    if (!titulo || !autor || !anio || disponible === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoId = libros.length > 0 ? libros[libros.length - 1].id + 1 : 1;
    const nuevoLibro = {
        id: nuevoId,
        titulo,
        autor,
        anio,
        disponible
    };

    libros.push(nuevoLibro); 
    
    fs.writeFileSync('libros.json', JSON.stringify(libros, null, 2));

    res.status(201).json(nuevoLibro);
});


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});