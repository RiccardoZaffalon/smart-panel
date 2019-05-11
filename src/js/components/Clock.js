import moment from 'moment';
require('moment/locale/it');

export default class Clock {
    constructor (dateId, dateMonthId, timeId) {
        this.$dateMonth = document.getElementById(dateMonthId);
        this.$date = document.getElementById(dateId);
        this.$time = document.getElementById(timeId);
    }

    clock () {        
        this.$time.textContent = moment().format('HH:mm:ss');
    }

    time () {
        this.clock();

        window.setInterval(() => {
            window.requestAnimationFrame(() => {
                this.clock();
            });
        }, 100);
    }

    date () {
        this.$dateMonth.textContent = moment().locale('it').format('MMMM ‘YY');
        this.$date.textContent = moment().locale('it').format('dddd, DD');
    }

    render () {
        this.date();
        this.time();
    }
}