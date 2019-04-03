export const getData = (method, url, data) => {
    console.log(method, url, data)
    // const jwt = sessionStorage.getItem('samsJwt');
    const opts = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${jwt}`
        // 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    }
    return fetch(url, opts).then(res => res.json())
    .then(response => {
      console.log(response)
      return response
    })
    .catch(error => {
      return error
    })
  }

export const getJwtData = (method, url, data, jwt) => {
    console.log(method, url, data, jwt)
    // const jwt = sessionStorage.getItem('samsJwt');
    const opts = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
        // 'Access-Control-Allow-Origin': '*'
      },
      body: data && JSON.stringify(data)
    }
    return fetch(url, opts).then(res => res.json())
    .then(response => {
      console.log(response)
      return response
    })
    .catch(error => {
      return error
    })
  }