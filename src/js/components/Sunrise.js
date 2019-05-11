import Velocity from 'velocity-animate';

export default class Sunrise {
    constructor () {
        this.speed = 100;
    }

    start () {  
        Velocity(document.getElementById('app'), {
            backgroundColor: '#ffffff',
            color: '#000000'
        }, { duration: 600000 / this.speed });        
    }
}