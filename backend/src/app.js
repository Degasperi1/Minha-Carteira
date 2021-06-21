const express = require('express');
const cors = require('cors');

const app = express();

// ==> Rotas da API:
const index = require('./routes/index');
const movementRoute = require('./routes/movements.routes');
const movementTypeRoute = require('./routes/movementType.routes');
const userRoute = require('./routes/user.routes');
const reportRoute = require('./routes/reports.routes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/', movementRoute);
app.use('/', movementTypeRoute);
app.use('/', userRoute);
app.use('/', reportRoute);

module.exports = app;