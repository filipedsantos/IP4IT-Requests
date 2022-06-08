import { showAlert } from './alerts.js';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': 'true',
      },
      url: 'http://localhost:3000/api/v1/users/login',
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Content-type': 'application/json',
      // },
      // withCredentials: true,
      data: {
        email,
        password,
      },
    });

    console.log(res);

    if (res.data.status === 'success') {
      showAlert('success', 'Login successfull!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (error) {
    showAlert('error', error.response.data);
  }
};

export const logout = async () => {
  try {
    console.log('im here');

    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logout successfull!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (error) {
    //alerts.showAlert('error', error.response.data.message);
    alert(error.response.data.message);
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    // const res = await axios();
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signup successfull!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (error) {
    console.error(error.response.data);
    showAlert('error', error.response.data);
  }
};
