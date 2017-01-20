const http = require('http');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan'); //request logger
const natural = require('./app/router');
const path = require('path');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('dev')); // log every request to the console
app.set('port', process.env.PORT || 3001);

const server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'views')));
app.use('/api/natural', natural);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'))
});
