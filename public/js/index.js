import { showAlert } from './alerts.js';
import { finishRequest, sendNewRequest, sendEditRequest } from './requests.js';
import { login, logout, signup } from './login.js';
import { desactivateHardware, newHardware, editHardware } from './hardware.js';

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
const btnDesactivateHardware = document.getElementById(
  'btnDesactivateHardware'
);

const divNewHardware = document.querySelector('.new__hardware');
const divEditHardware = document.querySelector('.edit__hardware');

const btnFormNew = document.getElementById('btnFormNew');
const btnFormEdit = document.getElementById('btnFormEdit');
const inputTag = document.getElementById('tag');
const inputType = document.getElementById('type');

const inputTagEdit = document.getElementById('tagEdit');
const inputTypeEdit = document.getElementById('typeEdit');
const inputInUse = document.getElementById('using');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCancelModal = document.querySelector('.btn__modal-cancel');
const btnConfirmModal = document.querySelector('.btn__modal-confirm');

const paginationDiv = document.querySelector('.pagination');
const btnPaginationPrev = document.querySelector('.pagination__btn--previous');
const btnPaginationNext = document.querySelector('.pagination__btn--next');

// const inputCheckboxes = document.querySelectorAll('.input__checkbox');

let viewsPerPage = 55;

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

  document.querySelector('.table').addEventListener('mouseover', function (e) {
    if (
      e.target.classList.contains('btn__finish-request') &&
      !e.target.classList.contains('request--closed')
    ) {
      e.target.textContent = 'Close';
      e.target.style.backgroundColor = '#f3b61f';
    }
  });

  document.querySelector('.table').addEventListener('mouseout', function (e) {
    if (
      e.target.classList.contains('btn__finish-request') &&
      !e.target.classList.contains('request--closed')
    ) {
      e.target.textContent = 'Open';
      e.target.style.backgroundColor = 'green';
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
  if (id === 'btnDesactivateHardware') {
    btnDesactivateHardware.classList.add('btnActive');
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

          const hardwareInfo = document.getElementById(hwChoosed);

          inputTagEdit.value =
            hardwareInfo.getElementsByTagName('td')[1].innerHTML;
          inputTypeEdit.value =
            hardwareInfo.getElementsByTagName('td')[2].innerHTML;
          inputInUse.value = hardwareInfo
            .getElementsByTagName('td')[3]
            .innerHTML.toLowerCase();
        }
      }
      if (e.target.id === 'btnDesactivateHardware') {
        if (hwChoosed.length === 0) {
          showAlert('error', 'Please select at least 1 piece of Hardware!');
          return;
        } else {
          toogleVisibilityFormHw(clicked.id);

          promiseModal(e)
            .then(res => {
              // console.log(res);
              closeModal();
              desactivateHardware(hwChoosed);
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

if (btnFormNew) {
  btnFormNew.addEventListener('click', e => {
    e.preventDefault();
    const tag = inputTag.value.toUpperCase();
    const type = inputType.value;
    console.log(tag, type);

    newHardware(tag, type);
  });
}

if (btnFormEdit) {
  btnFormEdit.addEventListener('click', e => {
    e.preventDefault();
    const tag = inputTagEdit.value.toUpperCase();
    const type = inputTypeEdit.value;
    const using = inputInUse.value;

    const [...value] = document.querySelectorAll('.input__checkbox:checked');
    const hwChoosed = value.map(el => el.value);

    editHardware(hwChoosed, tag, type, using);
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
      reject('Hardware desactivated error!');
    });
    btnConfirmModal.addEventListener('click', e => {
      resolve('Hardware desactivated successfully!');
    });
  });
};

// PAGINATION
// const renderPagination = function (page, results, resultsPerPage) {
//   const currentPage = page;
//   const numPages = Math.ceil(results / resultsPerPage);

//   console.log(currentPage, numPages);

//   // Page 1, and there are other pages
//   if (currentPage === 1 && numPages > 1) {
//     console.log('1s page');

//     btnPaginationPrev.classList.add('hidden');
//     btnPaginationNext.classList.remove('hidden');

//     btnPaginationPrev.innerHTML = `< Page ${currentPage - 1}`;
//     btnPaginationNext.innerHTML = `Page ${currentPage + 1} >`;
//     return;
//   }

//   // Last page
//   if (currentPage === numPages && numPages > 1) {
//     // btnPaginationNext.classlist.add('hidden');
//     console.log('last page');

//     btnPaginationNext.classList.add('hidden');
//     btnPaginationPrev.classList.remove('hidden');

//     btnPaginationPrev.innerHTML = `< Page ${currentPage - 1}`;
//     btnPaginationNext.innerHTML = `Page ${currentPage + 1} >`;
//     return;
//   }

//   // Other page
//   if (currentPage < numPages) {
//     // btnPaginationPrev.classlist.remove('hidden');
//     // btnPaginationNext.classlist.remove('hidden');
//     console.log('other page');

//     btnPaginationPrev.classList.remove('hidden');
//     btnPaginationNext.classList.remove('hidden');

//     btnPaginationPrev.innerHTML = `< Page ${currentPage - 1}`;
//     btnPaginationNext.innerHTML = `Page ${currentPage + 1} >`;
//     return;
//   }
// };

// if (paginationDiv) {
//   // page, results, resultsPerPage
//   let page = paginationDiv.getAttribute('data-page') * 1;
//   let results = paginationDiv.getAttribute('data-nelements') * 1;

//   let resultsPerPage = 5;
//   renderPagination(page, results, resultsPerPage);
//   btnPaginationPrev.addEventListener('click', e => {
//     e.preventDefault();

//     page -= 1;
//     paginationDiv.setAttribute('data-page', page);
//     renderPagination(page, results, resultsPerPage);
//   });

//   btnPaginationNext.addEventListener('click', e => {
//     e.preventDefault();
//     page += 1;
//     paginationDiv.setAttribute('data-page', page);
//     renderPagination(page, results, resultsPerPage);
//   });
// }
