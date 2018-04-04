function ItemHistoryDao(connection) {
    this._connection = connection;
}

ItemHistoryDao.prototype.save = function(history,callback) {
    this._connection.query('INSERT INTO ITEMS_HISTORY SET ?', history, callback);    
}

ItemHistoryDao.prototype.update = function(item, callback) {
    this._connection.query('UPDATE ITEMS_HISTORY SET ? WHERE ID_HISTORY = ?', [history, history.id_history], callback);    
}

ItemHistoryDao.prototype.delete = function(idHistory,callback) {
    this._connection.query('DELETE FROM ITEMS_HISTORY WHERE id_history = ?', idHistory, callback);    
}

ItemHistoryDao.prototype.findByIdHistory = function (idHistory, callback) {
    this._connection.query('SELECT * FROM ITEMS_HISTORY WHERE id_history = ?', idHistory, callback);    
}

ItemHistoryDao.prototype.findByItemId = function (idItem, callback) {
    this._connection.query('SELECT * FROM ITEMS_HISTORY WHERE id = ?', idItem, callback);    
}

ItemHistoryDao.prototype.findAll = function () {
    this._connection.query('SELECT * FROM ITEMS_HISTORY', callback);
}

module.exports = function(){
    return ItemHistoryDao;
};