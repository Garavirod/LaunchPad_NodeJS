const socket = io();
let counter = 0;

socket.on('temp:data', function(ds) {
    pinta_grafica(0, 'temperatura', ds, charTemp);
    pinta_grafica(1, 'hzt', ds, charLuz);
    pinta_grafica(2, 'humedad', ds, charhumedad);
});


// Grafica de temperaturua
var objTemp = document.getElementById('graphic_temp').getContext('2d');
var charTemp = graphicSettings(objTemp, 'rgb(21, 212, 47)', 'Temperatura');
// Grafica de tluz
var objLuz = document.getElementById('graphic_luz').getContext('2d');
var charLuz = graphicSettings(objLuz, 'rgb(239, 243, 11)', 'Lumens');
// Grafica de 3 sensor
var objhumedad = document.getElementById('graphic_hume').getContext('2d');
var charhumedad = graphicSettings(objhumedad, 'rgb(11, 243, 215)', 'humedad');

// DEFINICION DE FUNCIONES 


/*
    Función que se encarga de pintar el chart en el canvas del DOM.
    @param: index Es el índice de la señal que se está leyendo 0:tem , 1:luz: 2:mag
    @param: Id del canvas del DOM
    @param ds : dataset
    @param: mychart chart previemente configurado para una señal en espesifico
*/


function anima_temperatura(ds, idDiv) {
    const units = {
        Celcius: "°C",
        Fahrenheit: "°F"
    };

    const config = {
        minTemp: -20,
        maxTemp: 100,
        unit: "Celcius"
    };

    // Change temperature
    const range = 15.5;
    const temperature = document.getElementById("temperature");

    function setTemperature() {
        temperature.style.height = (range - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
        temperature.dataset.value = range + units[config.unit];
    }
    setTimeout(setTemperature, 500);

    // Cambiar valores de los divs
    let t = document.getElementById(idDiv);
    let r = (parseFloat(ds.value[index]) * 100);
    t.innerHTML = r + "°C";
}


function anima_foco() {
    var styleElem = document.head.appendChild(document.createElement("style"));
    styleElem.innerHTML = "#lampara:after {box-shadow: 0 0 200px 10px rgb(212, 203, 74);}";
}

function anima_magnetismo() {

}

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

    switch (signal) {
        case 'temperatura':
            anima_temperatura(ds, varGraficaId);
            break;
        case 'luz':
            break;
        case 'magnetismo':
            break;
    }


}

// Función que configura algunas propiedades del chart
/*
    @param: ctx obj del DOM
    @param: color del borde de la gráfica
    @param etq: etiqueta de la gráfica
*/
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
                    fontColor: '#fff'
                }
            }
        }
    });

    return myChart;
}