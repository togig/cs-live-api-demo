const Records = require('../app/controllers/records');
const fs = require('fs');

module.exports = function (app) {
    
    // API Routes ->
    app.get('/api*', (req, res) => {
        res.status(400).send({
            code: 1,
            msg: 'Please use POST method instead.'
        })
        // todo; addLog bad request
    });

    app.post('/api/v1/records', (req, res) => {
        Records.getRecords(req, res);
    });
    // <- API Routes 

    // Views
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/app/views/index.html');
    });

    app.get('/log', function (req, res) {
        fs.readFile('access.log', 'utf8', (err, data) => {
            if (err) throw err;
            res.status(200).send(data)
        });
    });

};
