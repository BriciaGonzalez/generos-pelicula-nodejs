const express = require('express');
const app = express();
const generos = require('./routes/generos.js');

app.use('/api/generos', generos);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Monitoreando puerto ${port}`);
});