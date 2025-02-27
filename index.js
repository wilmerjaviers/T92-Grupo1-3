const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();   
const PORT = 3000;
//Para obtener el directorio del archivo libros.json
const pathLibros = path.join(__dirname, './libros.json')
//Middleware
app.use(express.json());

//funcion para leer el archivo
const leerLibros = ()=>{
    const data = fs.readFileSync(pathLibros, 'utf-8');
    const dataJson = JSON.parse(data);
    return dataJson
};
//funcion para actualizar
const saveLibros =  (dataJson) =>{
    fs.writeFileSync(pathLibros, JSON.stringify(dataJson), 'utf-8')
}

//cargando el arreglo
const libros = leerLibros();

//Api para obtener datos
app.get('/libros',(req,res)=>{
    res.status(200).json({status: 200, message: 'Success', libros});
});

// Api para actualizar registros
app.put('/libros/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    let datosNuevos = req.body;
    let libroId = libros.findIndex(libro => libro.id === id);

    if (libroId !== -1){
        //Se actualiza el arreglo usando el operador de propagacion
        libros[libroId]={...libros[libroId], ...datosNuevos}
        saveLibros(libros)
        res.status(200).json({status: 200, message: "Libro Actualizaod", libro: libros[libroId]})
    }else{
        res.status(400).json({status:404, message: "Libro no encontrado"})
    }
});

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