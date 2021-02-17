const Productions = require('./productionorder');
//const GroupsItem = require('../bdservice');
const ProductionService = require('./service');

const service = ProductionService(Productions);

module.exports = service;