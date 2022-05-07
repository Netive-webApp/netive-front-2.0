import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers/fetch-wrapper';

import { useState } from "react";
import { useEffect } from "react";
import authheader from '../helpers/fetch-wrapper.js';
import { useAlert } from 'react-alert';

const { publicRuntimeConfig } = getConfig();
const baseUrl = "https://netive-backend.herokuapp.com/api-info";//`${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
    getMyProfile,
    updateProfile,
    getApps,
    registerApp,
    getDashboardData,
    socialLogin,
    validateToken,
    delete: _delete
};

function login(username, password) {
    return fetchWrapper.post(`https://netive-backend.herokuapp.com/auth/`, { username, password })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            //userSubject.next(user);
            localStorage.setItem('token', user.token);
            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('token');
    //userSubject.next(null);
    Router.push('/');
}

function register(user) {
    return fetchWrapper.post(`${baseUrl}/register/`, user);
    
}
function registerApp(app){
    var url = `${baseUrl}/register/app/`

    //return fetch(url, requestOptions);
    return fetchWrapper.post(`${baseUrl}/register/app/`, app);
}

function socialLogin(cookie, router){
  
  localStorage.setItem('token', cookie);
  Router.push('/');
}

function validateToken(cookie){
  var url = `${baseUrl}/validateToken/`
  
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(cookie)
};

var [valid, isValid] = useState(false)
    
  useEffect(() => {
    fetch('https://netive-backend.herokuapp.com/api-info/validateToken/', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if(data.status == 'failed'){
            valid = false
        } else if (data.status == 'success') {
            valid = true;
        }
        
        setData(data)
        isValid(valid)
        
      })
  }, [])

    return {data, valid}


}

function getMyProfile(cookie) {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': `Token ${cookie}`}
      };
      
      useEffect(() => {
        setLoading(true)
        fetch('https://netive-backend.herokuapp.com/api-info/account/', requestOptions)
          .then((res) => res.json())
          .then((data) => {
            
            setData(data)
            setLoading(false)
          })
      }, [])

      return data
}

function getApps(cookie) {
    const [dataa, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': `Token ${cookie}`}
      };
      
      useEffect(() => {
        fetch('https://netive-backend.herokuapp.com/api-info/apps/', requestOptions)
          .then((res) => res.json())
          .then((data) => {
            setData(data)
          })
      }, [])

      return dataa
}

function updateProfile(data) {
    return fetchWrapper.post(`${baseUrl}/updateProfile/`, data)
}
function getDashboardData(cookie){
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': `Token ${cookie}`}
      };
      
      useEffect(() => {
        setLoading(true)
        fetch('https://netive-backend.herokuapp.com/api-info/dashboard/', requestOptions)
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          })
      }, [])

      return data
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

