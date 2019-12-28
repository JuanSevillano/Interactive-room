'use strict';
const { Board, Led, Leds } = require("johnny-five")

const devices = [];

class RoomController {

    constructor() {
        console.log('[ room-controller ] - Starting board');
        this.boardIsReady = false;
        this.board = new Board({ repl: false }); // Disabling RELP due to is not required so far
        this.led = ''
        this.led2 = ''
        this.led = ''

        this.board.on("ready", () => {

            this.led = new Led.RGB({
                pins: {
                    red: 6,
                    green: 5,
                    blue: 3,
                }
            });

            this.leds = new Leds([9, 10, 11]);

            devices.push(this.led);
            devices.push(this.led2);
            devices.push(this.leds)

            this.boardIsReady = true;
        });
    }

    /** the led is a unique reference still and that's 
     * why is implemented with this.led instead of looking for the reference */
    ledOn(ref) {
        this.led.on()
        this.leds.on();
    }

    ledOff(ref) {
        this.led.off()
        this.leds.off();
    }

    ledBlink(ref) {
        this.led.blink()
    }

    ledColor(ref, color) {
        console.log(color);
        this.led.color(color)
    }

    ledStop(ref) {
        this.led.stop()
    }

    getDevices() {
        return devices;
    }

}

module.exports = RoomController;