const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const apiRouter = require('../api/api')



app.use('/api', apiRouter)

// for production use build folder for static files

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
// serve the client index.html file for all requests
app.get('*', (req, res) => {
res.sendFile(path.join(buildPath, 'index.html'));
});

/*
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));
// serve the client index.html file for all requests
app.get('*', (req, res) => {
res.sendFile(path.join(publicPath, 'index.html'));
});
*/

app.listen(port, () => {
    console.log(__dirname);
    console.log(`Server is up on port ${port}!`);
 });