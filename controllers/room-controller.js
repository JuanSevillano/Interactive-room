const { Board, Led } = require("johnny-five");
const board = new Board({repl: false}); // Disabling RELP due to is not required so far

let boardIsReady = false; 
console.log('[ roomController, 5 ]  -  Starting board...')

/** Components to be added to the board  */
let led;

board.on("ready", () => { 
    led = new Led.RGB({
        pins: {
            red: 6,
            green: 5,
            blue: 3
        }
    });
    boardIsReady = true; 
});

const roomController = ( actionType, args ) => {

     if(boardIsReady){

        led.on();
        
        switch(actionType){
            case 'on': 
                led.on()
            break;
            case 'off':
                led.off()
            break;
            case 'setColor':
                led.color(args)
            break;
            case 'blink':
                led.blink()
            case 'stop':
                led.stop()
            break;
            case 'toggle': 
                led.toggle()
            break;
            default: 
                console.log(led)
            break;
        }
     }

}

module.exports = roomController;