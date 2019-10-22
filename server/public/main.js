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
    if (counter < 5) {
        myChart.data.labels.push(counter);
        myChart.data.datasets.forEach(dataset => {
            dataset.data.push(ds.value * 100);
        });
    } else {
        counter = 0;
        myChart.data.labels.splice(0, 3);
        myChart.data.datasets.forEach(dataset => {
            dataset.data.splice(0, 3);

        });
    }
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
            label: ['Temperatura'],
            borderColor: 'rgb(203, 238, 30)',
            data: [],
            fill: false
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: true,
                ticks: {
                    fontColor: "#fff",
                    fontSize: 14
                }
            }]
        },
        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'white'
            }
        }
    }
});