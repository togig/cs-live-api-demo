var DB_URI = {
    remote : 'mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study',
    local : 'mongodb://localhost/cs-live-api-demo'
}

var DB_ROOT = 'remote'; // local

const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(DB_URI[DB_ROOT], { useNewUrlParser: true }, function(error) {
    // If database connection ends with error; add log.
});

db.once('open', function () {
    console.log(`Database connection has been established via "${DB_URI[DB_ROOT]}`)
})

module.exports = { db, mongoose }