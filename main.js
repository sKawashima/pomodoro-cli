const notifier = require('node-notifier');
const readline = require('readline');

const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0, null);
        process.stdout.write(minutes + ':' + seconds);

        if (--timer < 0) {
            timer = duration;
            notifier.notify({
                title: 'Pomodoro Timer',
                message: 'Time is up!',
                sound: true
            });
        }
    }, 1000);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const startPomodoro = () => {
    rl.question('Press Enter to start the Pomodoro timer...', (answer) => {
        startTimer(25 * 60, process.stdout);
        setTimeout(() => {
            startTimer(5 * 60, process.stdout);
        }, 25 * 60 * 1000);
    });
}

startPomodoro();
