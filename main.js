const readline = require('readline');
const notifier = require('node-notifier');

let workCount = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const timer = (minutes) => new Promise((resolve) => {
  let timeLeft = minutes * 60;
  const intervalId = setInterval(() => {
    timeLeft--;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    process.stdout.write(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    if (timeLeft === 0) {
      clearInterval(intervalId);
      resolve();
    }
  }, 1000);
});

const startTimer = async () => {
  rl.question('作業時間を開始しますか？(y/n)', (answer) => {
    if (answer.toLowerCase() === 'y') {
      workCount++;
      console.log(`${'🍎'.repeat(workCount)}`);
      timer(25).then(() => {
        notifier.notify({
          title: 'タイマー',
          message: '作業時間が終了しました。休憩時間を開始します。'
        });
        startBreak();
      });
    }
  });
};

const startBreak = () => {
  rl.question('休憩時間を開始しますか？(y/n)', (answer) => {
    if (answer.toLowerCase() === 'y') {
      timer(5).then(() => {
        notifier.notify({
          title: 'タイマー',
          message: '休憩時間が終了しました。作業時間を開始します。'
        });
        startTimer();
      });
    }
  });
};

startTimer();
