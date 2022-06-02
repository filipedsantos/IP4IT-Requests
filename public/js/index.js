import { showAlert } from './alerts.js';
import { finishRequest, sendNewRequest, sendEditRequest } from './requests.js';
import { login, logout, signup } from './login.js';

const welcomeMessage = document.querySelector('.welcome-gnb');
const welcomeRequests = document.querySelector('.welcome-requests');
const newRequestForm = document.querySelector('.form--new-request');
const editRequestForm = document.querySelector('.form--edit-request');
const btnFinishRequestParent = document.querySelector('.requests__table');
const formLogin = document.querySelector('.form--login');
const formSignup = document.querySelector('.form--signup');
const btnLogout = document.querySelector('.nav__el--logout ');

// New request form
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

// Edit request form
if (editRequestForm) {
  editRequestForm.addEventListener('submit', e => {
    e.preventDefault();

    const id = document
      .querySelector('.btn__edit-request')
      .getAttribute('request-id');
    console.log(id);

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
      sendEditRequest(id, name, hardware);
    }
  });
}

// Event delegation for finishRequests & Edit Buttons
if (btnFinishRequestParent) {
  document
    .querySelector('.requests__table')
    .addEventListener('click', function (e) {
      e.preventDefault();
      const click = e.target.getAttribute('request-open');
      console.log(click);
      // Matching strategy
      if (click === 'true') {
        if (e.target.classList.contains('btn__finish-request')) {
          const id = e.target.getAttribute('request-id');
          console.log(id);
          finishRequest(id);
        }

        if (e.target.classList.contains('btnEdit')) {
          console.log('press');
          const id = e.target.getAttribute('request-id');
          location.href = `/${id}`;
        }
      }
    });
}

if (formLogin) {
  formLogin.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('login --', email, password);
    login(email, password);
  });
}

if (formSignup) {
  formSignup.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    console.log('sign');
    signup(name, email, password, passwordConfirm);
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', e => {
    e.preventDefault();
    logout();
  });
}
