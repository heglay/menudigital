const express = require('express');
const User = require('../models/User');
const Client = require('../models/Client');
const Menu = require('../models/Menu');
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.get('/clients', async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
});

router.get('/menus', async (req, res) => {
    const menus = await Menu.find();
    res.json(menus);
});

// Outras rotas administrativas...

module.exports = router;