function ItemDao(connection) {
    this._connection = connection;
}

ItemDao.prototype.save = function(item) {
    return new Promise( (resolve,reject) => {
        this._connection.query('INSERT INTO ITEMS SET ?', item, function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        }
    );    
}

ItemDao.prototype.update = function(item) {
    return new Promise( (resolve,reject) => {
        this._connection.query('UPDATE ITEMS SET ? WHERE id = ?', [item, item.id], function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        }
    );    
}

ItemDao.prototype.delete = function(id) {
    return new Promise( (resolve,reject) => {
        this._connection.query('DELETE FROM ITEMS WHERE id = ?', id, function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        }
    );    
}

ItemDao.prototype.findById = function (id,callback) {
    this._connection.query("SELECT * FROM ITEMS WHERE id = ?",[id], callback);
}

ItemDao.prototype.findAll = function () {
    this._connection.query("SELECT * FROM ITEMS", callback);
}


ItemDao.prototype.saveHistory = function(history) {
    return new Promise( (resolve,reject) => {
        this._connection.query('INSERT INTO ITEMS_HISTORY SET ?', history, function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        }
    );    
}

module.exports = function(){
    return ItemDao;
};