// npm init --yes
// npm i nunjucks express cors helmet morgan nunjucks-date-filter
// npm i nodemon --save-dev
// -> nodemon app 으로 실행 가능

const nunjucks = require('nunjucks');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const marketRouter = require('./router/market.js');
const dateFilter = require('nunjucks-date-filter');
const path = require('path');

const app = express();
app.set('view engine', 'html');

pathway = path.join(path.join(__dirname + '/resource'), '/static');

app.use('/', express.static(pathway));

let env = nunjucks.configure('resource/pages', {
  autoescape: true,
  express: app,
  watch: true
});
env.addFilter('date', dateFilter);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res, next) => {
  res.render('index.html');
});

app.use('/', marketRouter);



app.use((req, res, next) => {
  res.sendStatus(404);
})

app.use((err, req, res, next) => {
  console.log('애러났음!')
  console.log(err);
  res.sendStatus(500);
})

app.listen(8080);
