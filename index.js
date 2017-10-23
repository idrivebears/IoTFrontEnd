var request = require('request');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

function getRoomInfo(roomID, results, callback) {
    request({
        uri: "http://api.thingspeak.com/channels/340868/feeds.json?api_key=I21FG50YC5V0SR5J&results=" + results,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function (error, response, body) {
        callback(error, response, body);
    });
}

function processRoomInformation(data) {
    console.log('processRoomInformation');
    console.log(data);
    var date_split = data.created_at.split('T');
    var date = date_split[0];
    var time = date_split[1].substring(0, date_split[0].length-2); // remove the 'z' in the string

    var temp = data.field1;
    var humidity = data.field2;

    var id = data.entry_id;

    return {
        id: id,
        date: date,
        time: time,
        temp: temp,
        humidity: humidity
    };
}

function getRoomHistory(data) {
    console.log('getRoomHistory()');
    console.log(data)
    var output = [];

    data.forEach(function(element) {
        output.push(processRoomInformation(element));
    });

    return output;
}

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

var router = express.Router();

//API filter
router.use(function (req, res, next) {
    // do logging
    console.log('Request made');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/room/:room_id')
    .get(function (req, res) {
        var roomId = req.params.room_id;

        console.log('Request made to room');
        console.log(roomId);
        var data;
        var info = getRoomInfo(roomId, 1, function (error, response, body) {
            data = JSON.parse(body);
            console.log(data);
            var roomName = 'Salón ' + roomId;
            var message = roomName + ': ' + 'Temperatura Actual';
            res.render('room_view', { title: roomName, message: message, temperature: '24.0' });
        });
    });

router.route('/room/stats/:room_id/')
    .get(function (req, res) {
        var roomId = req.params.room_id;

        console.log('Request made to room');
        console.log(roomId);
        var data;
        var info = getRoomInfo(roomId, 20, function (error, response, body) {
            data = JSON.parse(body);
            //console.log(data.feeds);
            var roomName = 'Salón ' + roomId;
            var message = roomName + ': ' + 'Historial de Temperatura';
            var roomHistory = getRoomHistory(data.feeds);
            res.render('room_history_view', { title: roomName, message: message, roomHistory: roomHistory });
        });
    });

router.get('/', function (req, res) {
    getRoomInfo(2);
    res.send('<h1>My App</h1>');
});

app.use('/', router);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});