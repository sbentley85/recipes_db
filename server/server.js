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
    // allows Content-Type header to be set - not exposed by default
    exposedHeaders: ['Content-Type']
}));
app.use(errorhandler());

app.use('/api', apiRouter)

// for production use build folder for static files


if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '..', 'build');
    app.use(express.static(buildPath));
    // serve the client index.html file for all requests
    app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
    });
    
}



/*
if(process.env.NODE_ENV === 'development') {
    const publicPath = path.join(__dirname, '..', 'public');
    app.use(express.static(publicPath));
    // serve the client index.html file for all requests
    app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
    });
}


*/

app.listen(port, () => {
    
    console.log(`Server is up on port ${port}!`);
 });