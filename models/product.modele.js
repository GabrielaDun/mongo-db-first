const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    client: { type: String, required: true}
})

modele.export = mongoose.model('Product', productsSchema)