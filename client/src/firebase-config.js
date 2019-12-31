import * as firebase from 'firebase'

class fb {
    
    constructor() {
        this.config = {
            apiKey: "AIzaSyCmcllVZjFpkFzO-UZyrGbwh0LaV8Uj5w4",
            authDomain: "reacting-sevi.firebaseapp.com",
            databaseURL: "https://reacting-sevi.firebaseio.com",
            projectId: "reacting-sevi",
            storageBucket: "reacting-sevi.appspot.com",
            messagingSenderId: "593666217440",
            appId: "1:593666217440:web:c6fa7738149a552f094785"
        }
        this.app = firebase.initializeApp(this.config);
        this.db = this.app.database();
    }

    getInstance() {
        return this.app;
    }

    getDbInstance = () => {
        return this.db;
    }
}

const instance = new fb();
export default instance; 