const socket = io();
let counter = 0;

socket.on('signals:data', function(ds) {
    update_graficos(0, ds, charTemp);
    update_graficos(1, ds, charLuz);
    update_graficos(2, ds, charMag);
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


function anima_temperatura(ds) {
    const units = {
        Celcius: "°C",
        Fahrenheit: "°F"
    };

    const config = {
        minTemp: -20,
        maxTemp: 100,
        unit: "Celcius"
    };


    let r = (parseFloat(ds.value[0]) * 100).toFixed(1);

    // Change temperature
    const range = r;
    const temperature = document.getElementById("temperature");

    function setTemperature() {
        temperature.style.height = (range - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
        temperature.dataset.value = range + units[config.unit];
    }
    setTimeout(setTemperature, 500);

    // Cambiar valores de los divs
    let tc = document.getElementById("TC");
    //let v0 = document.getElementById("V0");
    tc.innerHTML = r + "°C";
    //v0.innerHTML = "V";
}


function anima_foco(ds) {
    var vo = 0; //ds.value[1];
    let lum = 0;
    let watt = "";
    let frec = (vo / (0.000986)).toFixed(3);
    let luminosidad = 0;

    if (vo >= 0 && vo <= 0.70) {
        watt = "0";
    } else
    if (vo > 0.70 && vo <= 0.89) {
        lum = 370;
        watt = "40";
        luminosidad = 10;
    } else if (vo > 0.90 && vo <= 1.17) {
        lum = 900;
        watt = "70";
        luminosidad = 20;
    } else if (vo > 1.18 && vo <= 1.39) {
        lum = 864;
        watt = "24";
        luminosidad = 40;
    } else if (vo > 1.40 && vo <= 1.73) {
        lum = 950;
        watt = "100";
        luminosidad = 60;
    } else if (vo > 1.74 && vo <= 1.85) {
        lum = 1900;
        watt = "200";
        luminosidad = 80;
    } else {
        lum = 4984;
        watt = "434";
        luminosidad = 100;
    }

    // Cambia datos
    let lumnes = document.getElementById("LUMENS");
    let watts = document.getElementById("WATTS");
    let hertz = document.getElementById("HERTZ");
    let vo_foco = document.getElementById("VO_FOCO");

    lumnes.innerHTML = lum;
    watts.innerHTML = watt;
    hertz.innerHTML = frec;
    vo_foco.innerHTML = vo;


    //Anima foco
    var styleElem = document.head.appendChild(document.createElement("style"));
    if (luminosidad != 0) {
        styleElem.innerHTML = "#lampara:after {box-shadow: 0 0 200px " + luminosidad + "px rgb(212, 203, 74);}";
    } else {
        styleElem.innerHTML = "#lampara:before, #lampara:after  {opacity: 0;}";
        styleElem.innerHTML = ".lamp .lamp__light{fill: #8C8F99;}";
    }

}

function anima_magnet(ds) {
    let vo = 0.89; //ds.value[2];
    let campo = 80;


    // if (vo >= 0 && vo <= 0.70) {
    //     watt = "0";
    // } else
    // if (vo > 0.70 && vo <= 0.89) {
    //     lum = 370;
    //     watt = "40";
    //     luminosidad = 10;
    // } else if (vo > 0.90 && vo <= 1.17) {
    //     lum = 900;
    //     watt = "70";
    //     luminosidad = 20;
    // } else if (vo > 1.18 && vo <= 1.39) {
    //     lum = 864;
    //     watt = "24";
    //     luminosidad = 40;
    // } else if (vo > 1.40 && vo <= 1.73) {
    //     lum = 950;
    //     watt = "100";
    //     luminosidad = 60;
    // } else if (vo > 1.74 && vo <= 1.85) {
    //     lum = 1900;
    //     watt = "200";
    //     luminosidad = 80;
    // } else {
    //     lum = 4984;
    //     watt = "434";
    //     luminosidad = 100;
    // }

    // Cambia datos
    let vo_mag = document.getElementById("VO_MAG");
    vo_mag.innerHTML = vo;

    //Anima magnetometro
    var styleElem = document.head.appendChild(document.createElement("style"));
    styleElem.innerHTML = ".circle  {width: " + campo + "px; height: " + campo + "px;}";


}

function update_graficos(signal, ds, chart) {

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
            anima_temperatura(ds);
            break;
        case 1:
            anima_foco(ds);
            break;
        case 2:
            anima_magnet(ds);
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