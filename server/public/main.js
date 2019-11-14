const socket = io();
let counter = 0;

socket.on('signals:data', function(ds) {
    update_graficos(0, 'temperatura', ds, charTemp);
    update_graficos(1, 'lampara', ds, charLuz);
    update_graficos(2, 'mag', ds, charMag);
});


// Grafica de temperaturua
var objTemp = document.getElementById('graphic_temp').getContext('2d');
var charTemp = graphicSettings(objTemp, '#F59F1B', 'Temperatura');
// Grafica de tluz
var objLuz = document.getElementById('graphic_luz').getContext('2d');
var charLuz = graphicSettings(objLuz, 'rgb(239, 243, 11)', 'Lumens');
// Grafica de 3 sensor
var objmag = document.getElementById('graphic_mag').getContext('2d');
var charMag = graphicSettings(objmag, ' rgb(20, 130, 220)', 'Mag');

// DEFINICION DE FUNCIONES 


/*
    Función que se encarga de pintar el chart en el canvas del DOM.
    @param: index Es el índice de la señal que se está leyendo 0:tem , 1:luz: 2:mag
    @param: Id del canvas del DOM
    @param ds : dataset
    @param: chart chart previemente configurado para una señal en espesifico
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


    let r = (parseFloat(ds.value[0]) * 100);

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
    t.innerHTML = r + "°C";
}


function anima_foco(ds, idDiv) {
    var styleElem = document.head.appendChild(document.createElement("style"));
    let parametro = ds.value[1]; //señal que se obtuvo de la launchapad
    let lum = "";
    //Agregar paramtros con los IF's
    styleElem.innerHTML = "#lampara:after {box-shadow: 0 0 200px " + lum + "px rgb(212, 203, 74);}";
}

function anima_magnet(ds, idDiv) {

}

function update_graficos(signal, divIdAnimate, ds, chart) {

    // ACTUALIZA GRÁFICA
    if (counter < 5) {
        chart.data.labels.push(counter);
        chart.data.datasets.forEach(dataset => {
            dataset.data.push(ds.value[signal] * 100);
        });
    } else {
        counter = 0;
        chart.data.labels.splice(0, 3);
        chart.data.datasets.forEach(dataset => {
            dataset.data.splice(0, 3);

        });
    }
    counter++;
    chart.update();

    // ACTUALIZA ANIMACION
    switch (signal) {
        case 0:
            anima_temperatura(ds, divIdAnimate);
            break;
        case 1:
            anima_foco(ds, divIdAnimate);
            break;
        case 2:
            anima_magnet(ds, divIdAnimate);
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
    var chart = new Chart(ctx, {
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

    return chart;
}