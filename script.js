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
const restartButton = document.getElementById('restart-button');

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
        startButton.classList.remove('selected');
        clearInterval(timer);
        startButton.textContent = 'resume';
    } else {
        setButtonState(buttonState.RUNNING);
        startButton.classList.remove('selected');
        timer = setInterval(updateTimer, 1000);
        startButton.textContent = 'pause';
    }
});

restartButton.addEventListener("click", restartTimer);

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

pomodoroButton.addEventListener('click', function() {
    setTimerState(timerState.POMODORO);
    selectedTimer('pomodoro-button');
    enteredTime = 25;
    restartTimer();
});

shortBreakButton.addEventListener('click', function() {
    setTimerState(timerState.SHORTBREAK);
    selectedTimer('shortBreak-button')
    enteredTime = 5;
    restartTimer();
});

longBreakButton.addEventListener('click', function() {
    setTimerState(timerState.LONGBREAK);
    selectedTimer('longBreak-button');
    enteredTime = 15;
    restartTimer();
});

restartButton.addEventListener('click', function() {
    restartButton.classList.add('spin-animation');
        setTimeout(() => {
            restartButton.classList.remove('spin-animation');
        }, 1000);
});

function changeBackground() {
    var selectElement = document.getElementById("background-select");
    var selectedValue = selectElement.options[selectElement.selectedIndex].value;
    document.body.style.backgroundImage = "url('" + selectedValue + "')";
}