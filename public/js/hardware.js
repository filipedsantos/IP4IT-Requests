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
    showAlert('error', error.response.data);
  }
};

export const deleteHardware = async id => {
  console.log('deleted: ', id);
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/hardware/${id}`,
    });

    if (res.status === 204) {
      showAlert('success', 'Hardware deleted!');
      window.setTimeout(() => {
        location.assign('/hardware');
      }, 500);
    }
  } catch (error) {
    console.error(error.response.data);
    showAlert('error', error.response.data);
  }
};
