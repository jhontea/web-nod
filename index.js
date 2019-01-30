const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000

var app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// route here
require('./route.js')(app);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render('errors/error', {title: "404", message: "Ooops, page not found..."});
});

app.use(function (req, res, next) {
    res.status(500).render('errors/error', {title: "500", message: "500..."});
});

exports = module.exports = app;