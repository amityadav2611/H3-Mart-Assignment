const express = require('express');

const route = require('./route')

const app = express();

app.use('/', route);

app.listen(process.env.PORT || 5000, function (){
    console.log('Express app running on port: ' + (process.env.PORT || 5000))
});

