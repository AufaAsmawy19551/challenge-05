require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const { HTTP_PORT = 3000 } = process.env;
const router = require('./routes');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const documentation = fs.readFileSync('./documentation.yml', 'utf8');
const swaggerDocument = YAML.parse(documentation);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(router);
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(require('./middlewares/error'));

app.listen(HTTP_PORT, () => console.log('running on port', HTTP_PORT));
