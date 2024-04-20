// script.js

let timer;
let minutes = 25;
let seconds = 0;
const buttonState = Object.freeze ({
    START: 1,
    RUNNING: 2,
    PAUSED: 3
});
let state = buttonState.START;
let enteredTime = null;
const startButton = document.getElementById('start-button');

function setButtonState(newState) {
    console.log('state changed from ' + state + ' to ' + newState);
    state = newState;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);

    if(state == buttonState.PAUSED || state == buttonState.START) {
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
    console.log('start/pause/resume button clicked');
    console.log(state);

    if(state == buttonState.START) {
        setButtonState(buttonState.RUNNING);
        timer = setInterval(updateTimer, 1000);
        startButton.textContent = 'pause';
    } else if(state == buttonState.RUNNING) {
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
    enteredTime = 25;
    restartTimer();
});

document.getElementById('shortBreak-button').addEventListener('click', function() {
    enteredTime = 5;
    restartTimer();
});

document.getElementById('longBreak-button').addEventListener('click', function() {
    enteredTime = 15;
    restartTimer();
});