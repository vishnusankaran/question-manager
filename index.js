import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import api from './api/v1';
import accumulator from './accumulator';

const app = express();
const swaggerDocument = YAML.load('./question-manager.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(api)
    .listen(2018, err => {
        if (err) throw err;
        console.log('App is listening to request on port:', 2018);
    });

accumulator.listen();