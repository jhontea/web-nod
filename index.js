const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// route here
app.get('/', (req, res) => res.render('pages/index'))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render('errors/error', {title: "400", message: "Ooops, page not found..."});
});

app.use(function (req, res, next) {
    res.status(500).render('errors/error', {title: "500", message: "500..."});
});

exports = module.exports = app;

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .get('/cool', (req, res) => res.send(cool()))
//   .get('/times', (req, res) => res.send(showTimes()))
//   .get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect()
//       const result = await client.query('SELECT * FROM test_table');
//       const results = { 'results': (result) ? result.rows : null};
//       res.render('pages/db', results );
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })
//   .get('/rsvp', (req, res) => res.send(showRsvp()))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// showTimes = () => {
//   let result = ''
//   const times = process.env.TIMES || 5
//   for (i = 0; i < times; i++) {
//     result += i + ' '
//   }
//   return result;
// }

// showRsvp = () => {
//   return "This is rsvp"
// }