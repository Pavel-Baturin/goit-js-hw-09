const refBattonStart = document.querySelector('button[data-start]');
const refBattonStop = document.querySelector('button[data-stop]');
const body = document.body;
let timerId = null;

refBattonStart.addEventListener('click', onButtonStartClick);
refBattonStop.addEventListener('click', onButtonStopClick);

refBattonStop.setAttribute("disabled", true);

function onButtonStartClick() {
    timerId = setInterval(colorSwitcherBody, 1000);
    refBattonStart.setAttribute("disabled", true);
    refBattonStop.removeAttribute("disabled");
}

function onButtonStopClick() {
    clearInterval(timerId);
    refBattonStart.removeAttribute("disabled");
    refBattonStop.setAttribute("disabled", true);
}

function colorSwitcherBody() {
    body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
