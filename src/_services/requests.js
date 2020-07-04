/* eslint-disable import/prefer-default-export */
import 'babel-polyfill';

let download = require('downloadjs');

export const request = async (method, url, data) => {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };
  try {
    const res = await fetch(url, opts);
    const response = await res.json();
    return response;
  } catch (error) {
    return error;
  }
};

export const requestJwt = (method, url, data, jwt) => {
  const opts = method === 'GET'
    ? {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }
    : {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: data && JSON.stringify(data)
    };
  return fetch(url, opts).then(res => res.json().then(jsonData => ({ ...jsonData, status: res.status })))
    .then((response) => {
      console.log(response, method, url);
      return response;
    })
    .catch(error => error);
};

export const downloadFile = (method, url, data, jwt, fileName) => {
  const opts = method === 'GET'
    ? {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }
    : {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: data && JSON.stringify(data)
    };
  return fetch(url, opts).then(function(resp) {
    return resp.blob();
  }).then(function(blob) {
    download(blob, fileName);
  }).catch(error => error);
};


// const downloadFilse = (token, fileId) => {
//   let url = `https://www.googleapis.com/drive/v2/files/${fileId}?alt=media`;
//   return fetch(url, {
//     method: 'GET',
//     headers: {
//       'Authorization': token
//     }
//   }).then(function(resp) {
//     return resp.blob();
//   }).then(function(blob) {
//     download(blob);
//   });
// }
