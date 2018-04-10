function ItemDao(connection) {
    this._connection = connection;
}

ItemDao.prototype.save = function(item, callback) {
    this._connection.query('INSERT INTO ITEMS SET ?', item, callback);    
}

ItemDao.prototype.update = function(item,callback) {
    this._connection.query('UPDATE ITEMS SET ? WHERE id = ?', [item, item.id], callback);
}

ItemDao.prototype.delete = function(id,callback) {
    this._connection.query('DELETE FROM ITEMS WHERE id = ?', id, callback);
}

ItemDao.prototype.findById = function (id,callback) {
    this._connection.query('SELECT * FROM ITEMS WHERE id = ?', id, callback);    
}

ItemDao.prototype.findAll = function (callback) {
    this._connection.query('SELECT * FROM ITEMS', callback);
}

module.exports = function(){
    return ItemDao;
};



/*

DDL: 

CREATE TABLE ITEMS ( 
      ID INT(11) NOT NULL AUTO_INCREMENT,
      STATUS VARCHAR(40), 
      LABEL VARCHAR(40), 
      DESCRIPTION VARCHAR(255), 
      POINTS INT(5), 
      PERCENT INT(3), 
      PRIMARY KEY(ID)
      );

CREATE TABLE ITEMS_HISTORY (
      ID_HISTORY INT(11) NOT NULL AUTO_INCREMENT, 
      STATUS VARCHAR(40),    
      ID INT(11), 
      MOVED DATE,
      PRIMARY KEY(ID_HISTORY)
      );

*/