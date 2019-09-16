// Application Core Settings ->
// -- Setting up static values
const port = process.env.port || 8080;

// -- Gathering requirements
const db = require(__dirname + '/_config/database');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const addRequestId = require('express-request-id')();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// -- Initialize requirements
const app = express();

// -- Putting middlewares
app.use(express.static('./app/views'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));

// ---- Adding log settings
app.use(addRequestId);

morgan.token('id', function getId(req) {
    return req.id
});

var loggerFormat = '<div>:id [:date[web]] ":method :url" :status :response-time</div>';
app.use(morgan(loggerFormat, {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));

// -- Getting routes
require(__dirname + '/_config/routes')(app);

// -- Initialize application
app.listen(port, () => {
    console.log(`Application is running on ${port} port.`);
});

// <- Application Core Settings

module.exports = app