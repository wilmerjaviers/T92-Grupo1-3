const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();   
const PORT = 3000;
//Para obtener el directorio del archivo libros.json
const pathLibros = path.join(__dirname, 'libros.json')
//Middleware
app.use(express.json());

//funcion para leer el archivo
const leerLibros = ()=>{
    const data = fs.readFileSync(pathLibros, 'utf-8');
    return data
};
//funcion para actualizar
const saveLibros =  (data) =>{
    fs.writeFileSync(pathLibros, JSON.stringify(data), 'utf-8')
}

//cargando el arreglo
const libros = JSON.parse(leerLibros());

//Api para obtener datos
app.get('/libros',(req,res)=>{
    res.status(200).json({status: 200, message: 'Success', libros});
});

// Api para actualizar registros
app.put('/libros',(req,res)=>{
    let reqLibros = req.body;
    let exist = false;
    libros.forEach(books => {
        if(books.id === reqLibros.id){
            exist=true;
            books.titulo = reqLibros.titulo;
            books.autor = reqLibros.autor;
            books.anio = reqLibros.anio;
            books.disponible = reqLibros.disponible;
        }
    });
    if(exist){
        res.json({status: 200, message: 'Success', reqLibros})
        saveLibros(reqLibros)
    }else{
        res.status(400).json({status: 400, message: 'Bad Request', reqLibros})
    }
});



app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});