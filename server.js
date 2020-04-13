/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const expressWinston = require('express-winston');
const winston = require('winston');
const morgan = require('morgan');
var helmet = require('helmet')
var fs = require('fs')
var cors = require('cors')
var dotenv = require('dotenv')
const compression = require('compression')
const app = express();

app.use(compression());
app.use(express.static('db'));
dotenv.config()
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Api = require('./route/api');



  if (!fs.existsSync(path.join(__dirname,'db/access.log'))) {
    fs.mkdirSync('db');
    }
    const accessLogSteam = fs.createWriteStream(path.join(__dirname, '/db/access.log'),{flags: 'a'})
    
    morgan.token('response-time-ms', (req,res)=>{
const time = this['response-time'](req,res,0) < 10 ? `0${this['response-time'](req,res,0)}ms` : `${this['response-time'](req,res,0)}ms`;
return time
    })
    app.use(morgan(':method   :url   :status    :response-time ms',{stream: accessLogSteam}))
// body parser middle ware


app.use(morgan(' :method   :url    :status   :response-time'))
// static file
app.use(express.static(path.join(__dirname, 'public')));
// global variable
app.use((req, res, next) => {
  // res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.session = req.session;
  next();
});


// use the index router
app.use('/api', Api);


app.get('/', (req, res, next) => {
  res.send('<h1>api-covid</h1>');
});
var port = (process.env.PORT || '3000');

app.listen(port, (req, res, next) => {
  console.log(`server running at port ${port}`);
});
