// script.js

let timer;
let minutes = 15;
let seconds = 0;
let isRunning = true;
let enteredTime = null;

function startTimer() {
    const pauseResumeButton = document.querySelector('.control-buttons button');
    timer = setInterval(updateTimer, 1000);

    if(minutes == enteredTime || 15) {
        pauseResumeButton.textContent = 'Start';
    }
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);

    if(minutes == 0 && seconds == 0) {
        clearInterval(timer);
        alert('Time is up! Take a break :)');
    } else if(! isRunning) {
        if(seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
    }
}

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function restartTimer() {
    clearInterval(timer);
    minutes = enteredTime || 15;
    seconds = 0;
    isRunning = true;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);
    const pauseResumeButton = document.querySelector('.control-buttons button');
    pauseResumeButton.textContent = 'Start';
    startTimer();
}

function chooseTime() {
    const newTime = prompt('Enter new time in minutes: ');
    if(! isNaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
        isRunning = true;
        const timerElement = document.getElementById('timer');
        timerElement.textContent = formatTime(minutes, seconds);
        clearInterval(timer);
        const pauseResumeButton = document.querySelector('.control-buttons button');
        pauseResumeButton.textContent = 'Start';
        startTimer();
    } else {
        alert('Invalid input. Please enter' + ' a valid number greater than 0');
    }
}

startTimer();
const pauseResumeButton = document.querySelector('.control-buttons button');
pauseResumeButton.addEventListener('click', e => {
    if(isRunning) {
        clearInterval(timer);
        pauseResumeButton.textContent = 'Pause';
    }
    else {
        pauseResumeButton.textContent = 'Resume';
    }
    isRunning = ! isRunning;
})