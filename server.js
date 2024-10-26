const express = require('express');
const app = express();
const PORT = 3000;

let numerosAsignados = new Set(); // Usamos un Set para almacenar números únicos

app.get('/elegir-numero', (req, res) => {
    const numero = parseInt(req.query.numero);

    if (numerosAsignados.has(numero)) {
        return res.json({ error: `El número ${numero} ya está asignado.` });
    }

    numerosAsignados.add(numero);
    return res.json({ mensaje: `Número ${numero} asignado exitosamente.` });
});

app.get('/obtener-numero-aleatorio', (req, res) => {
    const min = parseInt(req.query.min);
    const max = parseInt(req.query.max);

    let numeroAleatorio;
    do {
        numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (numerosAsignados.has(numeroAleatorio));

    numerosAsignados.add(numeroAleatorio);
    return res.json({ numero: numeroAleatorio });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
