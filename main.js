const readline = require('readline');
const notifier = require('node-notifier');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const workTime = 25 * 60;
const breakTime = 5 * 60;

let remainingTime = workTime;
let isWorking = true;
let timer;

const startTimer = () => {
  timer = setInterval(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Remaining time: ${Math.floor(remainingTime / 60)}:${remainingTime % 60}`);
    remainingTime--;

    if (remainingTime < 0) {
      if (isWorking) {
        notifier.notify({
          title: 'Pomodoro Timer',
          message: 'Time to take a break!'
        });
        remainingTime = breakTime;
      } else {
        notifier.notify({
          title: 'Pomodoro Timer',
          message: 'Time to work!'
        });
        remainingTime = workTime;
      }
      isWorking = !isWorking;
    }
  }, 1000);
}

rl.on('line', () => {
  if (timer) {
    clearInterval(timer);
  }
  startTimer();
});

rl.on('close', () => {
  clearInterval(timer);
});
