
const express = require('express');
const router = express.Router();
const Product = require('../models/product.modele')

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find())
  }
  catch(err) {
    res.status(500).json( { message: err})
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments()
    const random = Math.floor(Math.random() * count)
    const prod = await Product.findOne().skip(random)
    if(! prod) res.status(404).json( { message: 'Not found...'})
    else res.json(prod)
  }
  catch(err) {
    res.status(500).json({message: err})
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const id = await Product.findById(req.params.id)
    if(!id) res.status(404).json( {message: 'Not found'})
    else res.json(id)
  }
  catch(err) {
    res.status(500).json( { message: err})
  }
});

router.post('/products', async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProd = new Product( { name: name, client: client})
    await newProd.save()
    res.json( { message: 'OK' })
  }
  catch(err) {
    res.status(500).json( { message: err })
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { name, client } = req.body
    const id = await Product.findById( req.params.id)
    if (id) {
      await Product.updateOne({ _id: req.params.id}, {$set: { name: name, client: client}})
    }
    else res.status(404).json( {message: 'Not found'})
  }
  catch(err) {
    res.status(500).json( { message: err})
  }

});

router.delete('/products/:id', async (req, res) => {
  try {
    const id = await Product.findById( req.params.id )
    if(id) {
      await Product.deleteOne( {_id: req.params.id })
      res.json( {message: 'OK'})
    }
    else res.status(404).json({ message: 'Not found'})
  }
  catch(err) {
    res.status(500).json( { message: err})
  }

});

module.exports = router;
