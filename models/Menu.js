const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    title: String,
    items: [{
        name: String,
        description: String,
        price: Number,
        image: String
    }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    qrCode: String // URL para QR Code gerado
});

module.exports = mongoose.model('Menu', MenuSchema);