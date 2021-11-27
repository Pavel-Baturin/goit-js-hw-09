const refFirstDelay = document.querySelectorAll('input')[0];
const refDelayStep = document.querySelectorAll('input')[1];
const refAmount = document.querySelectorAll('input')[2];
const refForm = document.querySelector('.form');
refForm.addEventListener('submit', onFormSubmit);

let intervalId = null;
let numberPromises = 0;
let firstDelay = refFirstDelay.value;
let delayStep = refDelayStep.value;
let position = numberPromises + 1;

function onFormSubmit(event) {
  event.preventDefault()
  amount = refAmount.value;
   setTimeout(() => {
       delay = firstDelay;
       createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
     numberPromises += 1;
   }, firstDelay);
  
  
     intervalId = setInterval(() => {
    if (amount > numberPromises) {
      numberPromises += 1;
      delay = firstDelay + delayStep;
      createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    } else {
      clearInterval(intervalId);
    }
    }, delayStep); 
      
        
  
}

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    reject("Error! Error passed to reject function");
  }
    }, delay);
    
  })
}
