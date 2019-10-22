const socket = io();
let counter = 0;

socket.on('temp:data', function(ds) {
    pinta_grafica(0, 'temperatura', ds, charTemp);
    pinta_grafica(1, 'hzt', ds, charLuz);
    pinta_grafica(2, 'humedad', ds, charhumedad);
});


// Grafica de temperaturua
var objTemp = document.getElementById('graphic_temp').getContext('2d');
var charTemp = graphicSettings(objTemp, 'rgb(203, 238, 30)', 'Temperatura');
// Grafica de tluz
var objLuz = document.getElementById('graphic_luz').getContext('2d');
var charLuz = graphicSettings(objLuz, 'rgb(49, 236, 231)', 'Lumens');
// Grafica de 3 sensor
var objhumedad = document.getElementById('graphic_hume').getContext('2d');
var charhumedad = graphicSettings(objhumedad, 'rgb(236, 49, 233)', 'humedad');

// DEFINICION DE FUNCIONES 

function pinta_grafica(index, varGraficaId, ds, myChart) {
    if (counter < 5) {
        myChart.data.labels.push(counter);
        myChart.data.datasets.forEach(dataset => {
            dataset.data.push(ds.value[index] * 100);
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

    let t = document.getElementById(varGraficaId);
    let r = (parseFloat(ds.value[index]) * 100);
    t.innerHTML = r + "°C";
}

function graphicSettings(ctx, color, etq) {
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: [etq],
                borderColor: color,
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

    return myChart;
}