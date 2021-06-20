import { userService } from '../services/';
import { history } from '../helpers';

export const userActions = {
    login,
    logout
};

function login(email, password){
    return dispatch => {
       let apiEndpoint = 'auth';
       let payload = {
           email: email,
           password: password
       }
       userService.post(apiEndpoint, payload)
       .then((response)=>{
            if (response) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('auth', response.data.auth);
                dispatch(setUserDetails(response.data));
                history.push('/home');
            }
       })
    };
}

function logout(){
    return dispatch => {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        dispatch(logoutUser());
        history.push('/');
    }
}

export function setUserDetails(user){
      return{
          type: "LOGIN_SUCCESS",
          auth: user.auth,
          token: user.access_token
      }
}

export function logoutUser(){
      return{
          type: "LOGOUT_SUCCESS",
          auth: false,
          token: ''
      }
}