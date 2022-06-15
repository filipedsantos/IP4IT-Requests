import { showAlert } from './alerts.js';
import { finishRequest, sendNewRequest, sendEditRequest } from './requests.js';
import { login, logout, signup } from './login.js';
import { deleteHardware, newHardware } from './hardware.js';

const welcomeMessage = document.querySelector('.welcome-gnb');
const welcomeRequests = document.querySelector('.welcome-requests');

const newRequestForm = document.querySelector('.form--new-request');
const editRequestForm = document.querySelector('.form--edit-request');
const btnFinishRequestParent = document.querySelector('.table__requests');
const formLogin = document.querySelector('.form--login');
const formSignup = document.querySelector('.form--signup');
const btnLogout = document.getElementById('btnLogout');

const divLeftSection = document.querySelector('.left__side');
const divRightSection = document.querySelector('.right__side');
const btnsAdmin = document.querySelectorAll('.btn__admin-page');
const btnsHardware = document.querySelectorAll('.btn__hardware');

const btnNewHardware = document.getElementById('btnNewHardware');
const btnEditHardware = document.getElementById('btnEditHardware');
const btnDeleteHardware = document.getElementById('btnDeleteHardware');

const divNewHardware = document.querySelector('.new__hardware');
const divEditHardware = document.querySelector('.edit__hardware');

const btnForm = document.getElementById('btnForm');
const inputTag = document.getElementById('tag');
const inputType = document.getElementById('type');
const inputInUse = document.getElementById('using');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCancelModal = document.querySelector('.btn__modal-cancel');
const btnConfirmModal = document.querySelector('.btn__modal-confirm');

// const inputCheckboxes = document.querySelectorAll('.input__checkbox');

// New request form
if (newRequestForm) {
  newRequestForm.addEventListener('submit', e => {
    e.preventDefault();

    const hardware = [];
    const name = document.getElementById('user').value;

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

    const hardware = [];
    const name = document.getElementById('user').value;

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
  document.querySelector('.table').addEventListener('click', function (e) {
    e.preventDefault();
    const click = e.target.getAttribute('request-open');
    // Matching strategy
    if (click === 'true') {
      if (e.target.classList.contains('btn__finish-request')) {
        const id = e.target.getAttribute('request-id');
        finishRequest(id);
      }

      if (e.target.classList.contains('btnEdit')) {
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

    signup(name, email, password, passwordConfirm);
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', e => {
    e.preventDefault();
    logout();
  });
}

if (divLeftSection) {
  divLeftSection.addEventListener('click', e => {
    e.preventDefault();

    const clicked = e.target.closest('.btn__admin-page');

    btnsAdmin.forEach(el => el.classList.remove('btnActive'));
    clicked.classList.add('btnActive');

    if (e.target.id === 'btnAdmin') {
      location.href = '/admin';
    }
    if (e.target.id === 'btnHardware') {
      location.href = '/hardware';
    }
  });
}

const toogleVisibilityFormHw = function (id) {
  if (id === 'btnNewHardware') {
    const visible = divNewHardware.hidden;
    divNewHardware.hidden = !visible;
    btnNewHardware.classList.add('btnActive');
  }
  if (id === 'btnEditHardware') {
    const visible = divEditHardware.hidden;
    divEditHardware.hidden = !visible;
    btnEditHardware.classList.add('btnActive');
  }
  if (id === 'btnDeleteHardware') {
    btnDeleteHardware.classList.add('btnActive');
  }
};

const removeVisibilityFormHw = function () {
  divNewHardware.hidden = true;
  divEditHardware.hidden = true;
  btnsHardware.forEach(el => el.classList.remove('btnActive'));
};

if (divRightSection) {
  divRightSection.addEventListener('click', e => {
    e.preventDefault();

    const clicked = e.target.closest('.btn__admin-page');

    if (clicked.classList.contains('btnActive')) {
      removeVisibilityFormHw();
    } else {
      removeVisibilityFormHw();

      const [...value] = document.querySelectorAll('.input__checkbox:checked');
      const hwChoosed = value.map(el => el.value);

      if (e.target.id === 'btnNewHardware') {
        toogleVisibilityFormHw(clicked.id);
      }
      if (e.target.id === 'btnEditHardware') {
        if (hwChoosed.length !== 1) {
          showAlert('error', 'Please select only 1 piece of Hardware!');
          return;
        } else {
          toogleVisibilityFormHw(clicked.id);
        }
      }
      if (e.target.id === 'btnDeleteHardware') {
        if (hwChoosed.length === 0) {
          showAlert('error', 'Please select at least 1 piece of Hardware!');
          return;
        } else {
          toogleVisibilityFormHw(clicked.id);

          promiseModal(e)
            .then(res => {
              // console.log(res);
              closeModal();
              deleteHardware(hwChoosed);
            })
            .catch(error => {
              // console.error(error);
              closeModal();
            });
        }
      }
    }
  });
}

if (btnForm) {
  btnForm.addEventListener('click', e => {
    e.preventDefault();
    const tag = inputTag.value.toUpperCase();
    const type = inputType.value;
    console.log(tag, type);

    newHardware(tag, type);
  });
}

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const promiseModal = function (e) {
  return new Promise(function (resolve, reject) {
    openModal(e);

    btnCancelModal.addEventListener('click', e => {
      reject('Hardware delete error!');
    });
    btnConfirmModal.addEventListener('click', e => {
      resolve('Hardware deleted successfully!');
    });
  });
};
