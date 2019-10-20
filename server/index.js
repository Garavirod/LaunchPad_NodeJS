// SERVIDOR
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// CONEXION DE LOS WEB SOCKETS
const app = express();
const server = http.createServer(app); //Le damos la configuracion que le deamos a express
const io = socketIO.listen(server);

app.use(express.static(__dirname + '/public'));

server.listen(3000, function() {
    console.log('server listenig on port ' + 3000);
});

// SERIAL
const Serialport = require('serialport');
const ReadLine = Serialport.parsers.Readline; //Leer lo que llega linea a linea
const port = new Serialport('/dev/ttyACM0', {
    baudRate: 9600
});

const parser = port.pipe(new ReadLine({ delimeter: '\r\n' }));

parser.on('open', function() {
    console.log('Conection is opened');
});

parser.on('data', function(data) {
    console.log(data);
    //io.emit('temp', data);
    io.emit('temp:data', {
        value: data.toString()
    });


});

port.on('error', function(err) {
    console.log(err);
});