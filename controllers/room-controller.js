'use strict';

const { Board, Led } = require( "johnny-five")

module.exports = class RoomController {


    constructor(){
        console.log('[ room-controller ] - Starting board');
        this.boardIsReady = false; 
        this.board = new Board({repl: false}); // Disabling RELP due to is not required so far
        this.led = ''; 
        this.board.on("ready", () => { 
            this.led = new Led.RGB({
                pins: {
                    red: 6,
                    green: 5,
                    blue: 3
                }
            });
            this.boardIsReady = true; 
        });
    }

    /** the led is a unique reference still and that's 
     * why is implemented with this.led instead of looking for the reference */
    
    ledOn (ref){
         this.led.on()
    }

    ledOff (ref){
          this.led.off()
    }

    ledBlink (ref){
         this.led.blink()
    }

    ledColor (ref, color){
        this.led.color(color)
    }

    ledStop (ref){
         this.led.stop()
    }

}