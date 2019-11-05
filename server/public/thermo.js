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
const range = 25; //document.querySelector("input[type='range']");
const temperature = document.getElementById("temperature");

function setTemperature() {
    temperature.style.height = (range - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    temperature.dataset.value = range + units[config.unit];
}
setTimeout(setTemperature, 1000);

let element = document.getElementById('lampara') // or $('.my-element').get(0) when using jQuery
let style = window.getComputedStyle(element, '::before')
let color = style.getPropertyValue('background-color')