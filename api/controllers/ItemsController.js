module.exports = function(app) {

    app.get('/items', function(req, res) {
        console.log('Teste');
        console.log(new Date());
        res.send('OK');
    });

    app.post('/items/item', function(req,res) {
        let item = req.body;
        console.log('Request process for: ' + JSON.stringify(item));

        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        let promise = itemDao.save(item);
        promise
            .then( (result) => {
                console.log('Item created!');    
                item.id = result.insertId;
                
                res.json(item);
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
            } );       
    });

    app.post('/items/{id}', function(req,res) {
        let itemHistory = req.body;
        console.log('Request process for: ' + JSON.stringify(itemHistory));

        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        // TODO: SETAR ID NO HISTORY !!!!

        let promise = itemDao.saveHistory(itemHistory);
        promise
            .then( (result) => {
                console.log('Items history created!');    
                
                res.json(item);
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
            } );       
    });

}