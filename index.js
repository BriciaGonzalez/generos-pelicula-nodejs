
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const generos = [
    {id: 1, nombre: 'Romanticas'},
    {id: 2, nombre: 'Acción'},
    {id: 3, nombre: 'Animadas'},
    {id: 4, nombre: 'Terror'},
    {id: 5, nombre: 'Drama'},
    {id: 6, nombre: 'Musical'},
    {id: 7, nombre: 'Misterio'},
    {id: 8, nombre: 'Ciencia ficción'},
    {id: 9, nombre: 'Documentales'},
    {id: 10, nombre: 'Fantasia'},
];

//Obtener todos los generos
app.get('/api/generos', (req, res) => {
    res.send(generos);
});

//Obtener un solo genero
app.get('/api/generos/:id', (req, res) => {
    const genero = generos.find(c => c.id === parseInt(req.params.id));
    if (!genero) return res.status(404).send('El genero buscado no existe');
    res.send(genero);
});

//Crear un nuevo genero
app.post('/api/generos', (req, res) => {
    const {error} = validarGenero(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genero = {
        id: generos.length + 1,
        nombre: req.body.nombre
    }
    generos.push(genero);
    res.send(genero);
});

//Actualizar un genero
app.put('/api/generos/:id', (req, res) =>  {
    const genero = generos.find(c => c.id === parseInt(req.params.id));
    if (!genero) return res.status(404).send('El genero buscado no existe');

    const {error} = validarGenero(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genero.nombre = req.body.nombre;
    res.send(genero);
});

//Eliminar un genero
app.delete('/api/generos/:id', (req, res) => {
    const genero = generos.find(c => c.id === parseInt(req.params.id));
    if (!genero) return res.status(404).send('El genero buscado no existe');

    const index = generos.indexOf(genero);
    generos.splice(index, 1);
    res.send(`El genero ${genero.nombre} ha sido eliminado`);

});

function validarGenero(genero) {
    const schema = {
        nombre: Joi.string().min(2).required()
    }
    return Joi.validate(genero, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Monitoreando puerto ${port}`);
});