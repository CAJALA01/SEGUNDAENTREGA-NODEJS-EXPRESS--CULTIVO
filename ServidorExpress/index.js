const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');

const { checkToken } = require('./middlewares/jwt-validate');

const app = express();
const PORT =  process.env.PORT || 3000;

//Carpeta Public para archivos Front End estaticos
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Solo en desarrollo
app.use(cors());

app.use('/auth', authRouter);

app.use('/products', productsRouter);

app.get('/ping', checkToken, function (req, res) {
  return res.send('pong con Token valido');
});


app.listen(PORT, function () {
  console.log(`Servidor esta corriendo en el puerto ${PORT}`);
});
