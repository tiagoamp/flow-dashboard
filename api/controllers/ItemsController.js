module.exports = function(app) {

    app.get('/items', function(req, res) {
        console.log('Teste');
        console.log(new Date());
        res.send('OK');
    });

    app.post('/items', function(req,res) {
        // validations
        req.assert("status","Status must not be empty!").notEmpty();
        req.assert("description","Description must not be empty!").notEmpty();

        let validErrors = req.validationErrors();
        if (validErrors) {
            console.log('Validation errors: ' + JSON.stringify(validErrors));
            res.status(400).send(validErrors);
            return;
        }

        let item = req.body;
        console.log('Request process for: ' + JSON.stringify(item));

        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        let promise = itemDao.save(item);
        promise
            .then( (result) => {
                item.id = result.insertId;
                console.log('Item created: id = ' + item.id);    
                res.location('/items/' + item.id);
                res.status(201).json(item);
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
                res.status(500).send(err);
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
                res.send(err);
            } );       
    });

}