const Purchases = require('./purchaseorder');
//const GroupsItem = require('../bdservice');
const PurchaseService = require('./service');

const service = PurchaseService(Purchases);

module.exports = service;