const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SecretToken } = require('../middlewares/jwt-validate');

const router = express.Router();


// Registro de Usuario 
router.post('/register', async (req, res) => {

  if(req.body.mail && req.body.name && req.body.password) {

    // Formato del mail
    if ( /^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
      res.status(400).json({ success: false, message: 'Formato de mail incorrecto' });
      return
    }

    // Fijarme que no exista 
    const existingUser = users.find((u) => {
      return u.mail === req.body.mail;
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Mail repetido' });
    }

    // Usuario Correcto, Agregamos el Usuario. 
    // Encriptacion Hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      name: req.body.name,
      mail: req.body.mail,
      password: password
    }
    
    users.push(newUser);

    return res.status(200).json({ success: true, newUser, users });

  }
  else {
    return res.status(400).json({ success: false, message: 'Faltan datos (requeridos: mail, name, password)' });
  }
});

// Login de Usuario 
router.post('/login', async (req, res) => {
  
  // Buscamos el usuario con el mismo mail
  const user = users.find((u) => u.mail === req.body.mail);
  if (!user) {
    return res.status(400).json({ error: 'Usuario no encontrado' });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Contraseña no válida' });
  }

  // Crear el token JWT
  const token = jwt.sign({
    name: user.name,
    mail: user.mail
  }, SecretToken);

  res.status(200).json({ error: null, data: 'Login exitoso', token });
});

// Envio de informacion en Formulario de Contacto

router.post('/contactform', async (req, res) => {

  if(req.body.mailcontact && req.body.telephone && req.body.message) {

    // Formato del mail
    if ( /^\S+@\S+\.\S+$/.test(req.body.mailcontact) === false) {
      res.status(400).json({ success: false, message: 'Formato de mail incorrecto' });
      return
    }

    const newMessage = {
      mailcontact: req.body.mailcontact,
      telephone: req.body.telephone,
      message: req.body.message,
    }
    
    messageform.push(newMessage);

    return res.status(200).json({ success: true, newMessage, messageform });

  }
  else {
    return res.status(400).json({ success: false, message: 'Faltan datos (requeridos: mail, telefono, mensaje)' });
  }
});

module.exports = router;

const users = [
  {
    name: 'Agustin',
    mail: 'agustin@cajal.com.uy',
    password: '$2b$10$yJEORYPntNQgDJO98upIruDZu/iZfz2GYpb/vjCILoiXId/Sp4N6G' // Password: 123
  }
];

const messageform = [
  {
    mailcontact: 'arturito@cajal.com.uy',
    telephone:  '099111111',
    message: 'Que viva Uru !!'
  }
];
