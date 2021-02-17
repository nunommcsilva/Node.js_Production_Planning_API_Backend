const Groups = require('./bomgroup');
//const Groups = require('../bdservice');
const GroupService = require('./service');

const service = GroupService(Groups);

module.exports = service;