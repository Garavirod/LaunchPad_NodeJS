const socket = io();
/*
socket.on('temp', function(data) {
    console.log(data);
    let t = document.getElementById('temperature');
    t.innerHTML = (data * 100) + "°c";
});*/

let counter = 0;

socket.on('temp:data', function(ds) {
    console.log(ds);
    myChart.data.labels.push(counter);
    myChart.data.datasets.forEach(dataset => {
        dataset.data.push(ds.value * 100);
    });
    counter++;
    myChart.update();
    let t = document.getElementById('temperatura');
    let r = (parseFloat(ds.value) * 100);
    t.innerHTML = r + "°C";
});

var ctx = document.getElementById('graphics').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: ['serial'],
            borderColor: 'rgb(52,72,15)',
            data: [],
            fill: false
        }]
    },
    options: {}
});