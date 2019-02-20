const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.use(express.json());

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
router.get('/', (req, res) => {
    res.send(generos);
});

//Obtener un solo genero
router.get('/:id', (req, res) => {
    const genero = generos.find(c => c.id === parseInt(req.params.id));
    if (!genero) return res.status(404).send('El genero buscado no existe');
    res.send(genero);
});

//Crear un nuevo genero
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) =>  {
    const genero = generos.find(c => c.id === parseInt(req.params.id));
    if (!genero) return res.status(404).send('El genero buscado no existe');

    const {error} = validarGenero(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genero.nombre = req.body.nombre;
    res.send(genero);
});

//Eliminar un genero
router.delete('/:id', (req, res) => {
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

module.exports = router;