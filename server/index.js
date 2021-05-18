/* Trying socket based implementation */
/* Its a WIP  */

const express = require('express');
const axios = require('axios');

const app = express();

const server = app.listen(5000, function() {
    console.log('server running on port 5000');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log("Connected Socket id: ", socket.id);
  axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=RELIANCE.BSE&interval=1min&apikey=LS5R25VM75IYJ81F')
    .then(function (data) {
        console.log(data);
        io.emit('DATA', data);
    })
    .catch(function (err) {
        console.log(err);
    });
});