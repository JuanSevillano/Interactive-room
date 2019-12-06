import React from 'react';

const about = props => {
    return (
        <div>
            <h1>Room's devices:</h1>
            <form id="input_LED">
                <fieldset>
                    
                    <label for="color">Select Color: 
                        <input
                            name="color" 
                            type="color" 
                            value="#f6b73c" />
                    </label>
                    <label for="color">Turn On/Off : 
                        <input 
                            type="checkbox" 
                            name="status" />
                    </label>
                </fieldset>
            </form>
        </div>
    );
};

export default about;