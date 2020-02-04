const { Board, Led, Leds, LCD } = require("johnny-five")

const devices = [];

class RoomController {

    constructor() {
        console.log('[ room-controller ] - Starting board');
        this.boardIsReady = false;
        this.board = new Board({ repl: false }); // Disabling RELP due to is not required so far
        this.led = ''
        this.led2 = ''

        this.board.on("ready", () => {

            // RBB LED 
            this.led = new Led.RGB({
                pins: {
                    red: 6,
                    green: 5,
                    blue: 3,
                }
            });

            // Array of leds 
            this.leds = new Leds([9, 10, 11]);
            // LCD 
            this.lcd = new LCD({ controller: "PCF8574" });
            this.lcd.print("hello")
            
            // Adding the current devices to an array in order to manage them 
            devices.push(this.led);
            devices.push(this.led2);
            devices.push(this.leds)

            // Setting the controller-board ready 
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