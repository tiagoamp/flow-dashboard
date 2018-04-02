module.exports = function(app) {

    app.get('/items', function(req, res) {
        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        let promise = itemDao.findAll();
        promise
            .then( (result) => {
                res.json(result);
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
                res.status(500).send(err);
            } );
    });

    app.get('/items/:id', function(req, res) {
        let id = req.params.id;

        console.log('Request process for GET id: ' + JSON.stringify(id));

        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        let promise = itemDao.findById(id);
        promise
            .then( (result) => {
                const resp = {
                    item: result, 
                    links: [ 
                        { href: "/items/" + id, rel:"self", method:"GET" },
                        { href: "/items/" + id, rel:"update", method:"PUT" }, 
                        { href: "/items/" + id, rel:"delete", method:"DELETE" }
                    ]
                };
                res.json(resp);
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
                res.status(500).send(err);
            } );
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

                res.json(resp);
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

}