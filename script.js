// script.js

let timer;
let minutes = 25;
let seconds = 0;
let enteredTime = null;

const buttonState = Object.freeze ({
    START: 1,
    RUNNING: 2,
    PAUSED: 3
});
let statusState = buttonState.START;

const timerState = Object.freeze ({
    POMODORO: 1,
    SHORTBREAK: 2,
    LONGBREAK: 3
});
let timerType = timerState.POMODORO;

const startButton = document.getElementById('start-button');
const pomodoroButton = document.getElementById('pomodoro-button');
const shortBreakButton = document.getElementById('shortBreak-button');
const longBreakButton = document.getElementById('longBreak-button');

pomodoroButton.addEventListener('click', () => selectedTimer('pomodoro-button'));
shortBreakButton.addEventListener('click', () => selectedTimer('shortBreak-button'));
longBreakButton.addEventListener('click', () => selectedTimer('longBreak-button'));

if(statusState == buttonState.START) {
    pomodoroButton.classList.add('selected');
}

function selectedTimer(buttonId) {
    const buttons = [pomodoroButton, shortBreakButton, longBreakButton];
        buttons.forEach(btn => btn.classList.remove('selected'));
        document.getElementById(buttonId).classList.add('selected');
}

function setTimerState(newState) {
    console.log('timer state changed from ' + timerType + ' to ' + newState);
    timerType = newState;
}

function setButtonState(newState) {
    console.log('button state changed from ' + statusState + ' to ' + newState);
    statusState = newState;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);

    if(statusState == buttonState.PAUSED || statusState == buttonState.START) {
        console.log('this should not happen');
        clearInterval(timer);
    } else {
        if(seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
    }

    if(minutes == 0 && seconds == 0) {
        clearInterval(timer);
        alert('Time is up! Take a break :)');
    }
}

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function restartTimer() {
    setButtonState(buttonState.START);
    clearInterval(timer);
    minutes = enteredTime || 25;
    seconds = 0;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);
    startButton.textContent = 'start';
}

startButton.addEventListener('click', function() {
    console.log('button state is ' + statusState);

    if(statusState == buttonState.START) {
        setButtonState(buttonState.RUNNING);
        timer = setInterval(updateTimer, 1000);
        startButton.textContent = 'pause';
    } else if(statusState == buttonState.RUNNING) {
        setButtonState(buttonState.PAUSED);
        clearInterval(timer);
        startButton.textContent = 'resume';
    } else {
        setButtonState(buttonState.RUNNING);
        timer = setInterval(updateTimer, 1000);
        startButton.textContent = 'pause';
    }
});

document.getElementById('restart-button').addEventListener("click", restartTimer);

document.getElementById('chooseTime-button').addEventListener("click", function() {
    const newTime = prompt('Enter new time in minutes: ');
    if(! isNaN(newTime) && newTime > 0) {
        clearInterval(timer);
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
        restartTimer();
        const timerElement = document.getElementById('timer');
        timerElement.textContent = formatTime(minutes, seconds);
        startButton.textContent = 'start';
    } else {
        alert('Please enter a valid number greater than 0');
    }
});

document.getElementById('pomodoro-button').addEventListener('click', function() {
    setTimerState(timerState.POMODORO);
    enteredTime = 25;
    restartTimer();
});

document.getElementById('shortBreak-button').addEventListener('click', function() {
    setTimerState(timerState.SHORTBREAK);
    enteredTime = 5;
    restartTimer();
});

document.getElementById('longBreak-button').addEventListener('click', function() {
    setTimerState(timerState.LONGBREAK);
    enteredTime = 15;
    restartTimer();
});