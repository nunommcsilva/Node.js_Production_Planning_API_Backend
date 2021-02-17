const TraceabilityPurchases= require('./traceabilitypurchase');
const TraceabilityPurchaseService = require('./service');

const service = TraceabilityPurchaseService(TraceabilityPurchases);

module.exports = service;