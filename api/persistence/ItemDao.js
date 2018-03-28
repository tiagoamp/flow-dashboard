function ItemDao(connection) {
    this._connection = connection;
}

ItemDao.prototype.save = function(item,callback) {
    this._connection.query('INSERT INTO ITEMS SET ?', item, callback);
}

ItemDao.prototype.findById = function (id,callback) {
    this._connection.query("SELECT * FROM ITEMS WHERE id = ?",[id], callback);
}

ItemDao.prototype.findAll = function () {
    this._connection.query("SELECT * FROM ITEMS", callback);
}

module.exports = function(){
    return ItemDao;
};