import { showAlert } from './alerts.js';

export const newHardware = async (tag, hardwareType) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/hardware',
      data: {
        tag,
        hardwareType,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Hardware created!');
      window.setTimeout(() => {
        location.assign('/hardware');
      }, 500);
    }
  } catch (error) {
    console.error(error.response.data);
    showAlert('error', error.response.data.message);
  }
};
export const editHardware = async (id, tag, hardwareType, inUse) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/hardware/${id}`,
      data: {
        tag,
        hardwareType,
        inUse,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Hardware updated!');
      window.setTimeout(() => {
        location.assign('/hardware');
      }, 500);
    }
  } catch (error) {
    console.error(error.response.data);
    showAlert('error', error.response.data.message);
  }
};

export const desactivateHardware = async ids => {
  try {
    for (const id of ids) {
      const res = await axios({
        method: 'PATCH',
        url: `/api/v1/hardware/${id}`,
        data: {
          active: false,
        },
      });
    }
    // if (res.data.status === 'success') {
    //   showAlert('success', 'Hardware desactivated!');
    //   window.setTimeout(() => {
    //     location.assign('/hardware');
    //   }, 500);
    // }

    showAlert('success', 'Hardware desactivated!');
    window.setTimeout(() => {
      location.assign('/hardware');
    }, 500);
  } catch (error) {
    console.error(error.response.data);
    showAlert('error', error.response.data.message);
  }
};
