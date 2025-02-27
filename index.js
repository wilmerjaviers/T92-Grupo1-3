const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path')
const PORT = 3000;
app.use(express.json());

const pathLibros = path.join(__dirname, './libros.json')

const leerLibros = ()=>{
    const data = fs.readFileSync(pathLibros, 'utf-8');
    const dataJson = JSON.parse(data);
    return dataJson
};

const saveLibros =  (dataJson) =>{
    fs.writeFileSync(pathLibros, JSON.stringify(dataJson), 'utf-8')
}

const libros = leerLibros();

app.get('/libros',(req,res)=>{
    res.status(200).json({status: 200, message: 'Success', libros});
});


app.put('/libros', (req, res) => {
    let libro = req.body;
    let librosActuales = leerLibros(); 
    let exist = false;
    
    librosActuales.forEach(book => {
        if (book.id === parseInt(libro.id)) {
            exist = true;
            book.id = parseInt(libro.id);
            book.titulo = libro.titulo;
            book.autor = libro.autor;  
            book.anio = libro.anio; 
            book.disponible = libro.disponible;           
        } 
    });

    if (exist) {
        saveLibros(librosActuales);
        res.status(201).json({ status: 201, message: 'Success', libro });
    } else {
        res.status(400).json({ status: 400, message: 'Error, el libro no puede actualizarse', libro});
    }
});


app.post('/libros',(req, res)=>{
    let libro = req.body;
    let librosActuales = leerLibros(); 
    let findUser = librosActuales.find(book => book.id === libro.id);
    if(findUser){
        res.status(403).json({status:403,message:'Error, El libro ya existe',libro});
    }else{
        librosActuales.push(libro);
        saveLibros(librosActuales);
        res.json({status:200,message:'Success',libro});
    }
});


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});