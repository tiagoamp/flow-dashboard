var logger = require('../service/logger.js');

module.exports = function(app) {

    app.get('/items', function(req, res) {
        const connection = app.persistence.ConnectionFactory();
        const itemDao = new app.persistence.ItemDao(connection);
        const itemHistoryDao = new app.persistence.ItemHistoryDao(connection);

        let promiseItems = new Promise( (resolve, reject) => {
            itemDao.findAll(function(err, result) {
                if (err) reject("Database error: " + err);
                resolve(result);
            });
        });

        promiseItems.then(
            (result) => {
                
                const allHistPromises = Promise.all(

                    result.map(item => new Promise( (resolve,reject) => {
                        itemHistoryDao.findByItemId(item.ID, function(err, result) {
                            if (err) reject("Database error: " + err);
                            item.history = result;
                            resolve(item);                        
                            })} 
                        )
                    )
                );

                allHistPromises
                    .then( (finalResult) => {
                        logger.debug("GET items: " + JSON.stringify(finalResult));
                        console.log("GET items: " + JSON.stringify(finalResult));
                        res.json(finalResult);
                    })
                    .catch((err) => {
                        console.log("Failed: " + JSON.stringify(err));
                        logger.error("Failed: " + JSON.stringify(err));
                        ("GET items: " + JSON.stringify(finalResult));
                        res.status(500).send(err);
                    });

            }
        );
                   
    });

    app.get('/items/:id', function(req, res) {
        let id = req.params.id;

        console.log('Request process for GET id: ' + id);
        logger.info('Request process for GET id: ' + id);

        const connection = app.persistence.ConnectionFactory();
        const itemDao = new app.persistence.ItemDao(connection);
        const itemHistoryDao = new app.persistence.ItemHistoryDao(connection);

        Promise.all([

            new Promise( (resolve,reject) => {
                itemDao.findById(id, function(err, result) {
                    if (err) reject("Database error: " + err);
                    const itemRetrieved = result[0];
                    resolve(itemRetrieved);
                });
            }),

            new Promise( (resolve,reject) => {
                itemHistoryDao.findByItemId(id, function(err, result) {
                    if (err) reject("Database error: " + err);
                    const history = result;
                    resolve(history);
                });
            }),

        ])
        .then(finalResult => {  
            const itemComplete = {};
            itemComplete.item = {};

            finalResult.forEach( res => {
                if (Array.isArray(res)) {
                    itemComplete.item.history = res;
                } else {
                    itemComplete.item = res;
                }
            });

            itemComplete.links = [ 
                { href: "/items/" + id, rel:"self", method:"GET" },
                { href: "/items/" + id, rel:"update", method:"PUT" }, 
                { href: "/items/" + id, rel:"delete", method:"DELETE" }
                ];
            console.log("Item by id = " + JSON.stringify(itemComplete));
            logger.debug("Item by id: " + JSON.stringify(itemComplete));
            res.json(itemComplete);
        })
        .catch( (err) => {
            console.log("Failed: " + JSON.stringify(err));
            logger.error("Failed: " + JSON.stringify(err));
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
            logger.info('Validation errors: ' + JSON.stringify(validErrors));
            res.status(400).send(validErrors);
            return;
        }

        let item = req.body;
        console.log('Request POST process for: ' + JSON.stringify(item));
        logger.info('Request POST process for: ' + JSON.stringify(item));

        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        let promise = new Promise( (resolve,reject) => {
            itemDao.save(item, function(err,result) {
                console.log('Item created: id = ' + item.id);    
                logger.info('Item created: id = ' + item.id);    
                item.id = result.insertId;
                resolve(item);
            });
        });

        promise
            .then(
                (result) => {
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
                }
            )
            .catch( (err) => {
                console.log("Failed: " + JSON.stringify(err));
                logger.error("Failed: " + JSON.stringify(err));
                res.status(500).send(err);
            });
     
    });

    app.put('/items/:id', function(req,res) {
        let id = req.params.id;

        let item = req.body;
        item.id = id;
        console.log('Request PUT process for: ' + JSON.stringify(item));
        logger.info('Request PUT process for: ' + JSON.stringify(item));

        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        let promise = new Promise( (resolve,reject) => {
            itemDao.update(item, function(err,result) {
                console.log('Item updated: id = ' + item.id);
                logger.info('Item updated: id = ' + item.id);
                resolve(item);
            });
        });
        
        promise
            .then( (result) => {
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
                console.log("Failed: " + JSON.stringify(err));
                logger.error("Failed: " + JSON.stringify(err));
                res.status(500).send(err);
            } );
    });

    app.delete('/items/:id', function(req,res) {
        let id = req.params.id;

        console.log('Request DELETE process for: ' + id);
        logger.info('Request DELETE process for: ' + id);

        var connection = app.persistence.ConnectionFactory();
        var itemDao = new app.persistence.ItemDao(connection);

        let promise = new Promise( (resolve,reject) => {
            itemDao.delete(id, function(err,result) {
                console.log('Item deleted: id = ' + id);
                logger.info('Item deleted: id = ' + id);
                resolve(result);
            }); 
        });
                
        promise
            .then( (result) => {
                res.status(204).send();
            } ) 
            .catch( (err) => {
                console.log("Failed: " + JSON.stringify(err));
                logger.error("Failed: " + JSON.stringify(err));
                res.status(500).send(err);
            } );
    });

}