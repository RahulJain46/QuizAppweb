import delay from './delay';

const customerInformations = [];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (customerInfo) => {
  return replaceAll(customerInfo.firstName, ' ', '-');
};

class CustomerInfoApi {

    static saveCustomerInfo(customerInfo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      //  Simulate server-side validation
        // const minCourseTitleLength = 1;
        // const 
        // if (fort.fortName.length < minCourseTitleLength) {
        //   reject(`Title must be at least ${minCourseTitleLength} characters.`);
        // }
        let index=-1;
        if(customerInfo.email){
            index= customerInformations.findIndex(a => a.email == customerInfo.email);
            debugger;
           if(index>=0){
            reject(`You are already registered`);
           }
           else{
            customerInfo._id = generateId(customerInfo);
            customerInformations.push(customerInfo);

           }
        }
        // if (customerInfo._id && customerInfo.email) {
        //   const existingcustomerInfoIndex = customerInformations.findIndex(a => a.email == customerInfo.email);
        //   if(existingcustomerInfoIndex>)
        // } else {
        //     customerInfo._id = generateId(customerInfo);
        //     customerInformations.push(customerInfo);
        // }

        resolve(Object.assign({}, customerInfo));
      }, delay);
    });
  }
    static checkAuthentication(customerInfo,message){
       return new Promise((resolve,reject)=>{
         let status={}
        setTimeout(()=>{
          debugger;
         let customerInfo = customerInformations.filter(custInfo=> custInfo.email==customerInfo.email);
         if(customerInfo.length<=0){
          status.message=false;
         }
         resolve(Object.assign({}, status));
        },delay);
       });

   }
}

export default CustomerInfoApi;


