const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.json(menu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:clientId', async (req, res) => {
    const menus = await Menu.find({ client: req.params.clientId });
    res.json(menus);
});

// Outras rotas para editar, excluir etc...

module.exports = router;