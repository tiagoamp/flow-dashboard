var Item = require('./model/Item');
var ItemDao = require('./dao/ItemDao');

let item = new Item();
let itemDao = new ItemDao();

console.log('Alright!!!');

console.log(itemDao.getAll());