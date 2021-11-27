import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const currentDate = Date.now();
let selectedDate = null;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] > currentDate) {
        refButtonStart.removeAttribute("disabled");
          return selectedDate = selectedDates[0];
         
      } else {
          window.alert("Please choose a date in the future");
    }
  },
};


const refInput = document.querySelector('#datetime-picker');
const refNumberDays = document.querySelector('.value[data-days]');
const refNumberHours = document.querySelector('.value[data-hours]');
const refNumberMinutes = document.querySelector('.value[data-minutes]');
const refNumberSeconds = document.querySelector('.value[data-seconds]');
const refButtonStart = document.querySelector('button[data-start]')

refInput.addEventListener('click', onInputClick);

const calendar = flatpickr(refInput, options);
refButtonStart.setAttribute("disabled", true);
refButtonStart.addEventListener('click', onButtonStartClick);

function onInputClick() {
   calendar.open()
}

function onButtonStartClick() {
      refButtonStart.setAttribute("disabled", true);
     intervalId = setInterval(() => {
      const startDate = Date.now();
      const ms = selectedDate - startDate;
       const time = convertMs(ms);
       updateClockface(time);
       
       if (time.days && time.hours && time.minutes && time.seconds === '00') {
         clearInterval(intervalId);
       }
    }, 1000);
    
}
  
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refNumberDays.textContent = `${days}`;
  refNumberHours.textContent = `${hours}`;
  refNumberMinutes.textContent = `${minutes}`;
  refNumberSeconds.textContent = `${seconds}`;
}
