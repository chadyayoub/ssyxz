export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const url = 'http://34.245.213.76:3000/auth/signin';

export const login = (username, password) => {
  return async dispatch => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      handleErrors(errorResData);
    }

    const resData = await response.json();
    dispatch({
      type: LOGIN,
      token: resData.accessToken,
    });
  };
};

const handleErrors = errorResData => {
  console.log(errorResData);
  let message = 'Something unexpected happened! Please try again...';
  if (errorResData.statusCode == 401)
    message = 'Wrong Username or password! Please try again...';
  throw new Error(message);
};

export const logout = () => {
  return {type: LOGOUT};
};
