// const axios = require('axios');

import { showAlert } from './alerts.js';

export const sendNewRequest = async (name, hardware) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/requests',
      data: {
        user: name,
        hardware,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Request successful!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error);
  }
};

export const sendEditRequest = async (id, name, hardware) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/requests/${id}`,
      data: {
        user: name,
        isOpen: true,
        hardware,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Request successful!');
      window.setTimeout(() => {
        window.location.href.split('/').pop();
      }, 500);
    }
  } catch (error) {
    showAlert('error', error);
  }
};

export const finishRequest = async id => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/requests/finishRequest/${id}`,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Request finished!');
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error);
  }
};
