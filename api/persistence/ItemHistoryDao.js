function ItemHistoryDao(connection) {
    this._connection = connection;
}

ItemHistoryDao.prototype.save = function(history) {
    return new Promise( (resolve,reject) => {
        this._connection.query('INSERT INTO ITEMS_HISTORY SET ?', history, function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        }
    );    
}

ItemHistoryDao.prototype.update = function(item) {
    return new Promise( (resolve,reject) => {
        this._connection.query('UPDATE ITEMS_HISTORY SET ? WHERE ID_HISTORY = ?', [history, history.id_history], function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        }
    );    
}

ItemHistoryDao.prototype.delete = function(idHistory) {
    return new Promise( (resolve,reject) => {
        this._connection.query('DELETE FROM ITEMS_HISTORY WHERE id_history = ?', idHistory, function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        }
    );    
}

ItemHistoryDao.prototype.findByIdHistory = function (idHistory) {
    return new Promise( (resolve,reject) => {
        this._connection.query('SELECT * FROM ITEMS_HISTORY WHERE id_history = ?', idHistory, function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        }
    );    
}

ItemHistoryDao.prototype.findByItemId = function (idItem) {
    return new Promise( (resolve,reject) => {
        this._connection.query('SELECT * FROM ITEMS_HISTORY WHERE id = ?', idItem, function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        }
    );    
}

ItemHistoryDao.prototype.findAll = function () {
    return new Promise( (resolve,reject) => {
        this._connection.query('SELECT * FROM ITEMS_HISTORY', function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        }
    );
}

module.exports = function(){
    return ItemHistoryDao;
};