const express = require('express');
const bodyParser = require('body-parser');
var swaggerUI = require('swagger-ui-express');
var swaggerDocument = require('../swagger.json');


function SwaggerRouter() {
    let router = express();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    return router;
}

module.exports = SwaggerRouter;