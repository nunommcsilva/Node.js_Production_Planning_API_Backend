const TraceabilityProductions= require('./traceabilityproduction');
//const GroupsItem = require('../bdservice');
const TraceabilityProductionService = require('./service');

const service = TraceabilityProductionService(TraceabilityProductions);

module.exports = service;