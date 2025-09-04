const express = require('express');
const Client = require('../models/Client');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.json(client);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    const clients = await Client.find().populate('owner');
    res.json(clients);
});

// Outras rotas para editar, excluir etc...

module.exports = router;