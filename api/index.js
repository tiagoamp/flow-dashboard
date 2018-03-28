var app = require('./config/custom-express')();

app.listen(3001, function() {
    console.log('Servidor rodando port 3001');
});
