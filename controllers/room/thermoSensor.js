const { Sensor, Multi } = require('johnny-five')
const _PORT = "A1"

class thermoSensor {
    // This controller is designed for the DHT11
    constructor() {
        this.tempeture = 0
        this.humidity = 0

        this.sensors = new Multi({ controller: "DHT11_I2C_NANO_BACKPACK" })
        this.sensors.on("change", function () {
            // console.log("Thermometer");
            // console.log("  celsius           : ", this.thermometer.celsius);
            // console.log("  fahrenheit        : ", this.thermometer.fahrenheit);
            // console.log("  kelvin            : ", this.thermometer.kelvin);
            // console.log("--------------------------------------");

            // console.log("Hygrometer");
            // console.log("  relative humidity : ", this.hygrometer.relativeHumidity);
            // console.log("--------------------------------------");
        });
    }

}

module.exports = thermoSensor;
