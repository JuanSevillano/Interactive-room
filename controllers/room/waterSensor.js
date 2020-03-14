const { Sensor } = require('johnny-five')

class waterSensor {

    constructor(port) {
        
        this.port = port
        this.value = 0
        this.waterSensor = new Sensor(port)

        this.waterSensor.on("change", value => {
            this.value = value
       })
    }

}

module.exports = waterSensor;