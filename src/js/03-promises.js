const refFirstDelay = document.querySelectorAll('input')[0];
const refDelayStep = document.querySelectorAll('input')[1];
const refAmount = document.querySelectorAll('input')[2];
const refForm = document.querySelector('.form');
refForm.addEventListener('submit', onFormSubmit);

let intervalId = null;
let numberPromises = 0;


function onFormSubmit(event) {
  event.preventDefault()
  const amount = Number(refAmount.value);
  let firstDelay = Number(refFirstDelay.value);
  let delayStep = Number(refDelayStep.value);
       for (let i = 0; i < amount; i += 1) {
         
         createPromise(i+1, firstDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
         firstDelay += delayStep;
       }
      
      
        
  
}

function createPromise( position, delay ) {
  
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
    resolve({position, delay});
  } else {
    reject({position, delay});
  }
    }, delay);
    
  })
}
