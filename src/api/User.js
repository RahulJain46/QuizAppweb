const fetch = require('node-fetch');

data = {
    "password": "password1",
    "email": "rahuljain82043864saasass@gmail.com"
}

let authenticationStatus=(data)=>{
    fetch( 'http://localhost:3001/auth/signin' , {
            method:'post',
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(data)
    }).then((res)=>{
   return res.json();
    })
  .then(function (data) {
      console.log(data)
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}

// let data= {
//         "fortImage_url": "https://placehold.it/120",
//         "fortName": "K",
//         "fortPlace": "K",
//         "fortConstructedYear": 1

//     }

// data = {
//     "firstName":"Rahul" ,
//     "lastName": "Jain",
//     "password": "password1",
//     "mobileNumber": 123456797,
//     "email": "rahuljain82043864saasass@gmail.com"
// }
let getSignUp=(data)=>{
    fetch( 'http://localhost:3001/auth/signup' , {
            method:'post',
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(data)
    }).then((res)=>{
   return res.json();
    })
  .then(function (data) {
      console.log(data)
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}

let deleteUser=(body)=>{
  fetch( 'localhost:3001/auth/deleteUser' , {
            method:'delete',
            headers:{
              "content-type":"application/json"
            }
    }).then((res)=>{
   return res.json();
    })
  .then(function (data) {
    console.log('Request succeeded with JSON response', data);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}



authenticationStatus(data);
