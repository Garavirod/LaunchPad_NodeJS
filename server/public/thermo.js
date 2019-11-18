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

// var styleElem = document.head.appendChild(document.createElement("style"));
// styleElem.innerHTML = "#lampara:after {box-shadow: 0 0 200px 40px rgb(212, 203, 74);}";

// var styleElem = document.head.appendChild(document.createElement("style"));
// styleElem.innerHTML = "#lampara:before, #lampara:after  {opacity: 0;}";
// styleElem.innerHTML = ".lamp .lamp__light{fill: #8C8F99;}";