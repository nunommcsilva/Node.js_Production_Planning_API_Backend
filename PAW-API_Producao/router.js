const express = require('express');
let GroupApi = require('./server/bomgroups');
let AuthApi = require('./server/auth');
let SwaggerDoc = require('./server/swagger');
let ItemApi = require('./server/items');
let ProductionOrderApi = require('./server/productionorders');
let PurchaseOrderApi = require('./server/purchaseorders');
let TraceabilityProductionApi = require('./server/traceabilityproductions');
let TraceabilityPurchaseApi = require('./server/traceabilitypurchases');
let SearchApi = require('./server/search');

function initialize() {
  let api = express();

  api.use('/',GroupApi());
  api.use('/auth', AuthApi());
  api.use('/', SwaggerDoc());
  api.use('/', ItemApi());
  api.use('/', ProductionOrderApi());
  api.use('/', PurchaseOrderApi());
  api.use('/', SearchApi());
  api.use('/', TraceabilityProductionApi());
  api.use('/', TraceabilityPurchaseApi());

  return api;
}

module.exports = {
  initialize: initialize,
};