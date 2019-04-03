export const getData = (method, url, data) => {
    const opts = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    return fetch(url, opts).then(res => res.json())
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
  }

export const getJwtData = (method, url, data, jwt) => {
    const opts = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: data && JSON.stringify(data)
    }
    return fetch(url, opts).then(res => res.json())
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
  }