// SERVIDOR
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const puertoLocal = 2000;
const puertoSerial = '/dev/ttyACM0';

// CONEXION DE LOS WEB SOCKETS
const app = express();
const server = http.createServer(app); //Le damos la configuracion que le deamos a express
const io = socketIO.listen(server);
let df = [];
app.use(express.static(__dirname + '/public'));

server.listen(puertoLocal, function() {
    console.log('server listenig on port ' + puertoLocal);
});

// SERIAL
const Serialport = require('serialport');
const ReadLine = Serialport.parsers.Readline; //Leer lo que llega linea a linea
const port = new Serialport(puertoSerial, {
    baudRate: 9600
});

const parser = port.pipe(new ReadLine({ delimeter: '\r\n' }));

parser.on('open', function() {
    console.log('Conection is opened');
});

parser.on('data', function(data) {
    console.log(data);
    //io.emit('temp', data);    
    df.push(data); // Colectamos las tres señales de la launchapad
    if (df.length == 3) {
        io.emit('signals:data', {
            value: df //data.toString()
        });
        df = [];
    }
});

port.on('error', function(err) {
    console.log(err);
});