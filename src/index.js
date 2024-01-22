const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 3);

//middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/api',require('./routes/index'));

//starting server
app.listen(3000, () => {
    console.log(`Server on port ${3000}`);
});