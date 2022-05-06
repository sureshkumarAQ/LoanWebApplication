
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");


const app = express();

dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 8080


// Log request Using Morgan
app.use(morgan('tiny'));


// Parse request  to body parser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieParser());

// set view engine
app.set("view engin", "ejs");
app.set('views', path.join(__dirname, '/views'))



// Load routers
app.use('/', require('./server/routes/userRoutes.js'))

app.use('*', (req, res) => {
    res.send('Nothing Found')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

