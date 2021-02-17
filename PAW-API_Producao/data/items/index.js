const Items = require('./item');
//const Groups = require('../bdservice');
const ItemService = require('./service');

const service = ItemService(Items);

module.exports = service;