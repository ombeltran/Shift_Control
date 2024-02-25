const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDb = require('./database');
const app = express();


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
app.use('/api/employees',require('./routes/employees.routes'));
app.use('/api/customers',require('./routes/customers.routes'));
app.use('/api/users',require('./routes/users.routes'));

//starting server
app.listen(3000, () => {
    console.log(`Server on port ${3000}`);
});

connectDb();