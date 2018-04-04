module.exports = function(app) {

    app.get('/items/:id/history', function(req, res) {
        const id = req.params.id;

        var connection = app.persistence.ConnectionFactory();
        var itemHistoryDao = new app.persistence.ItemHistoryDao(connection);

        let promise = new Promise( (resolve,reject) => {
            itemHistoryDao.findByItemId(id, function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });    
        });
                
        promise
            .then( (result) => {
                res.json(result);
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
                res.status(500).send(err);
            } );
    });

    app.post('/items/:id/history', function(req,res) {
        const id = req.params.id;
        // validations
        req.assert("status","Status must not be empty!").notEmpty();
        req.assert("moved","Moved date must not be empty!").notEmpty();

        let validErrors = req.validationErrors();
        if (validErrors) {
            console.log('Validation errors: ' + JSON.stringify(validErrors));
            res.status(400).send(validErrors);
            return;
        }

        const history = req.body;
        console.log('Request process for: ' + JSON.stringify(history));

        var connection = app.persistence.ConnectionFactory();
        var itemHistoryDao = new app.persistence.ItemHistoryDao(connection);

        history.id = id;

        let promise = new Promise( (resolve,reject) => {
            itemHistoryDao.save(history, function(err,result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });    
        }); 
        
        promise
            .then( (result) => {
                history.id_history = result.insertId;
                console.log('Item History created: id = ' + history.id_history);    
                res.location('/items/' + id + 'history/' + history.id_history);

                const resp = {
                    history: history, 
                    links: [
                        { href: '/items/' + id + '/history/' + history.id_history, rel:"self", method:"GET" },
                        { href: '/items/' + id + '/history/' + history.id_history, rel:"update", method:"PUT" }, 
                        { href: '/items/' + id + '/history/' + history.id_history, rel:"delete", method:"DELETE" }
                    ]
                };

                res.status(201).json(resp);
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
                res.status(500).send(err);
            } );       
    });

    app.put('/items/:id/history/:idHistory', function(req,res) {
        const id = req.params.id;
        const idHistory = req.params.idHistory;

        let itemHistory = req.body;
        itemHistory.id_history = idHistory;
        itemHistory.id = id;
        console.log('Request process for: ' + JSON.stringify(itemHistory));

        var connection = app.persistence.ConnectionFactory();
        var itemHistoryDao = new app.persistence.ItemHistoryDao(connection);

        let promise = new Promise( (resolve,reject) => {
            itemHistoryDao.update(itemHistory, function(err,result) {
                console.log('Item History updated: id = ' + itemHistory.id_history);
                resolve(result);
            });    
        }); 
        
        promise
            .then( (result) => {
                const resp = {
                    history: itemHistory, 
                    links: [
                        { href: '/items/' + id + '/history/' + history.id_history, rel:"self", method:"GET" },
                        { href: '/items/' + id + '/history/' + history.id_history, rel:"update", method:"PUT" }, 
                        { href: '/items/' + id + '/history/' + history.id_history, rel:"delete", method:"DELETE" }
                    ]
                };

                res.json(resp);
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
                res.status(500).send(err);
            } );
    });

    app.delete('/items/:id/history/:idHistory', function(req,res) {
        const id = req.params.id;
        const idHistory = req.params.idHistory;

        console.log('Request process for: ' + idHistory);

        var connection = app.persistence.ConnectionFactory();
        var itemHistoryDao = new app.persistence.ItemHistoryDao(connection);

        let promise = new Promise( (resolve,reject) => {
            itemHistoryDao.delete(idHistory, function(err,result) {
                console.log('Item History deleted: id = ' + idHistory);
                resolve(result);
            });    
        });
        
        promise
            .then( (result) => {                
                res.status(204).send();
            } ) 
            .catch( (err) => {
                console.log("Failed: " + err);
                res.status(500).send(err);
            } );
    });

}