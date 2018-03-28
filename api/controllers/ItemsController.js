module.exports = function(app) {

    app.get('/items', function(req, res) {
        console.log('Teste');
        res.send('OK');
    });

    app.post('/items/item', function(req,res) {
        let item = req.body;
        console.log('Request process for: ' + JSON.stringify(item));

        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        itemDao.save(item, function(err,result) {
            console.log('Item created!');
            res.json(item);
        });
        
    });

}