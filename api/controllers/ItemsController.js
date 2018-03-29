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

                const resp = {
                    item: item, 
                    links: [
                        { href: "/items/" + item.id, rel:"self", method:"GET" },
                        { href: "/items/" + item.id, rel:"update", method:"PUT" }, 
                        { href: "/items/" + item.id, rel:"delete", method:"DELETE" }
                    ]
                };

                res.status(201).json(resp);
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
                res.status(500).send(err);
            } );       
    });

    app.put('/items/:id', function(req,res) {
        let id = req.params.id;

        let item = req.body;
        item.id = id;
        console.log('Request process for: ' + JSON.stringify(item));

        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        let promise = itemDao.update(item);
        promise
            .then( (result) => {
                console.log('Item updated: id = ' + item.id);

                const resp = {
                    item: item, 
                    links: [ 
                        { href: "/items/" + item.id, rel:"self", method:"GET" },
                        { href: "/items/" + item.id, rel:"update", method:"PUT" }, 
                        { href: "/items/" + item.id, rel:"delete", method:"DELETE" }
                    ]
                };

                res.send(resp);
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
                res.status(500).send(err);
            } );
    });

    app.delete('/items/:id', function(req,res) {
        let id = req.params.id;

        console.log('Request process for: ' + id);

        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        let promise = itemDao.delete(id);
        promise
            .then( (result) => {
                console.log('Item deleted: id = ' + id);
                res.status(204).send();
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
                res.status(500).send(err);
            } );
    });

    app.post('/items/:id', function(req,res) {
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