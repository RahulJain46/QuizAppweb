const fetch = require('node-fetch');



let getFort = () => {
  return fetch('http://localhost:3001/forts/').then((res) => {
    return res.json();
  }).then((body) => {
    return body;
  }).catch((err) => {
    return err;
  })
}


let updateFort = (_Id) => {
  fetch(`http://localhost:3001/forts/${_Id}`, {
    method: 'put',
    headers: {
      "content-type": "application/json"
    },
  //  body: JSON.stringify(data)
  }).then((res) => {
    return res.json();
  })
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}

let save = (fort) => {
  fetch('http://localhost:3001/forts/', {
    method: 'post',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(fort)
  }).then((res) => {
    return res.json();
  })
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}

let deleteFort = (_Id) => {
 return fetch(`http://localhost:3001/forts/${_Id}`, {
    method: 'delete',
    headers: {
      "content-type": "application/json"
    }
  }).then((res) => {
    console.log(res.json())
    return res.json();
  })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}

let getFortById = (_Id) => {
  return fetch('http://localhost:3001/forts/59fac2a478a99efad9ae87f7').then((res) => {

    return res.json();

  }).then((body) => {
    console.log(body)
    return body;
  }).catch((err) => {
    return err;
  })
}



export {
  getFort,
  getFortById,
  updateFort,
  deleteFort,
  save
}
