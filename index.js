import express from 'express';
import swaggerUi from 'swagger-ui-express';

const app = express();
const swaggerDocument = require('./swagger.json');
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(1234, err => {
    if (err) throw err;
    console.log('App is listening to request on port:', 1234);
});