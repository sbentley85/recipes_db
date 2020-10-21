const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3001;
const apiRouter = require('../api/api')
const morgan = require('morgan');
const errorhandler = require('errorhandler');
// const bodyParser = require('body-parser');
const cors = require('cors');


app.options('*', cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    exposedHeaders: ['Content-Type']
}));
app.use(errorhandler());

app.use('/api', apiRouter);

app.listen(port, () => {
    
    console.log(`Server is up on port ${port}!`);
 });