const socket = io();
socket.on('temp', function(data) {
    console.log(data);
    let t = document.getElementById('temperature');
    t.innerHTML = (data * 100) + "°c";
});