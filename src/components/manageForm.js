import react from "react";

class ManageForm{
     constructor(){
         //get and set ?
         //or should we two top components , one extends other using inheritance ?
         
         return{
             form :  { id: '', firstName: '', lastName: '' ,email: '', mobile:'', password:'', confirmpassword:'', text:false},
             errors: {}
         }

     }

}

export default ManageForm;