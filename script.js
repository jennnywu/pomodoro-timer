// script.js

let timer;
let minutes = 15;
let seconds = 0;
let isRunning = true;
let enteredTime = null;

function startTimer() {
    const pauseResumeButton = document.querySelector('.control-buttons button');

    if(minutes == enteredTime || 15) {
        pauseResumeButton.textContent = 'start';
        timer = setInterval(updateTimer, 1000);
        //isRunning = ! isRunning;
    }
}

function pomodoro() {
    enteredTime = 15;
    restartTimer();
}

function shortBreak() {
    enteredTime = 5;
    restartTimer();
}

function longBreak() {
    enteredTime = 10;
    restartTimer();
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);

    if(minutes == 0 && seconds == 0) {
        clearInterval(timer);
        alert('Time is up! Take a break :)');
    }
    if(isRunning) {
        clearInterval(timer);
    } else {
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
    pauseResumeButton.textContent = 'start';
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
        pauseResumeButton.textContent = 'start';
        startTimer();
    } else {
        alert('Please enter a valid number greater than 0');
    }
}

const pauseResumeButton = document.querySelector('.control-buttons button');
pauseResumeButton.addEventListener('click', e => {
    if(isRunning) {
        clearInterval(timer);
        pauseResumeButton.textContent = 'pause';
    } else {
        pauseResumeButton.textContent = 'resume';
    }
    isRunning = ! isRunning;
})

startTimer();
// window.addEventListener('load', startTimer);