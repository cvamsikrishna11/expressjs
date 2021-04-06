const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require("helmet");
const morgan = require('morgan');

const express = require('express');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

// DB work...
dbDebugger('Connected to DB...');

app.use(logger);
app.use(auth);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});