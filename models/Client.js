const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }]
});

module.exports = mongoose.model('Client', ClientSchema);