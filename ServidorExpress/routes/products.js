const express = require('express');
const router = express.Router();


const products = [
  {
    name: 'Focaccia de Romero y Tomate',
    price: '240',
    image: 'focaccia.jpeg'
  },
  {
    name: 'Focaccia de Quesos',
    price: '180',
    image: 'focacciaquesos.jpeg'
  }
];

// LISTA DE PRODUCTOS - OBTENER 
router.get('/', (req, res) => {
  return res.json(products)
})
 
// LISTA DE PRODUCTOS - CARGAR CON DATOS DEL BODY
router.post('/', (req, res) => {

    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image
    }
    
    products.push(newProduct);

    return res.status(200).json({ success: true, newProduct });

});


module.exports = router;
