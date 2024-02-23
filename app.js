const express = require('express');
const app = express();
const userRoutes = require('./routers/emails_router');
require('dotenv').config();

app.use(express.json());

app.use(express.static('public'));

const homeController = require('./controllers/homeController');
const getgameController = require('./controllers/getgame_controller');

app.get('/', homeController.index);
app.get('/getgame', getgameController.getGame);

app.use('/api/email', userRoutes);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
