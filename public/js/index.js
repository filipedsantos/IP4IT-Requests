import { showAlert } from './alerts.js';
import { finishRequest, sendNewRequest } from './requests.js';

const welcomeMessage = document.querySelector('.welcome-gnb');
const welcomeRequests = document.querySelector('.welcome-requests');
const newRequestForm = document.querySelector('.form--new-request');
const btnFinishRequestParent = document.querySelector('.requests__table');

// Start new request form
if (newRequestForm) {
  newRequestForm.addEventListener('submit', e => {
    e.preventDefault();

    const hardware = [];
    const name = document.getElementById('user').value;
    console.log(name);

    const hs = document.getElementById('headset').value;
    if (hs !== 'None') hardware.push(hs);

    const ca = document.getElementById('webcam').value;
    if (ca !== 'None') hardware.push(ca);

    if (!name) {
      showAlert('error', 'Please insert your name!');
    }
    if (hardware.length === 0) {
      showAlert('error', 'Please pick at least one piece of Hardware!');
    } else {
      sendNewRequest(name, hardware);
    }
  });
}

// Event delegation for finishRequests Buttons
if (btnFinishRequestParent) {
  document
    .querySelector('.requests__table')
    .addEventListener('click', function (e) {
      e.preventDefault();
      const click = e.target.getAttribute('request-open');
      // Matching strategy
      if (
        e.target.classList.contains('btn__finish-request') &&
        click == 'true'
      ) {
        const id = e.target.getAttribute('request-id');
        finishRequest(id);
      }
    });
}
