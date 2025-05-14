const express = require('express')
const app = express()
const port = 3000;
const indexRouter = require('./routes/index.route.js')

// set view with ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

module.exports = app;