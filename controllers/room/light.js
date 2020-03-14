const { Relay } = require('johnny-five')

class Light {
    constructor(port){
        this.light = new Relay(port)
    }

    on() {
        this.light.open()
    }

    off(){
        this.light.close()
    }

    getState(){
        return this.light.isOn
    }
}

module.exports = Light