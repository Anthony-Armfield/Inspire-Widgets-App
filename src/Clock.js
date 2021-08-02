import React from 'react';

var greeting = '';
var isHour12 = true;
var timeFormatString = '12 hour';
var date = new Date();
var timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: isHour12
};
var newDate = new Intl.DateTimeFormat('en-US', timeOptions).format(date);


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: newDate
        };
    }

    componentDidMount() {
        this.getGreetingString();
        this.intervalID = setInterval(() => this.clockTick(timeOptions), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    clockTick(timeChangeOptions) {
        this.changeTimeFormatString();
        if (!isHour12) {
            timeOptions = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            };
        } else {
            timeOptions = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            };
        }
        let date = new Date();
        var newDate = new Intl.DateTimeFormat('en-US', timeChangeOptions).format(date);
        this.setState({ time: newDate});
    }

    getGreetingString() {
        var greetingTime = new Date();
        var greetingHour = greetingTime.getHours();
        if (greetingHour >= 6 && greetingHour <= 12 ) {
            greeting = 'Morning';
        } else if (greetingHour > 12 && greetingHour <= 17) {
            greeting = 'Afternoon';
        } else if (greetingHour > 17 && greetingHour <= 22) {
            greeting = 'Evening';
        } else if ((greetingHour > 22 && greetingHour <= 24) || greetingHour < 6) {
            greeting = 'Night';
        }
    }

    changeTimeFormat() {
        console.log(isHour12);
        isHour12 = !isHour12;
        console.log(isHour12);
        this.changeTimeFormatString();
        this.clockTick(timeOptions);
    }

    changeTimeFormatString() {
        if (isHour12) {
            timeFormatString = '12';
        } else {
            timeFormatString = '24';
        }
        timeFormatString = timeFormatString + ' hour';
        let timeFormatContainer = document.querySelector('.hourButton');
        timeFormatContainer.innerHTML = timeFormatString;
    }

    render() {
        return (
            <div class="clock text-center">
                <button className="hourButton btn btn-primary" onClick={() => this.changeTimeFormat()}>{timeFormatString}</button>
                <h1>{this.state.time}</h1>
                <h3>Good {greeting}!</h3>
            </div>
        );
    }
}

export default Clock;