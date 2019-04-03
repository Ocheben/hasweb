export const phoneValidation = (e) => {
   const PhoneNumber = require ('awesome-phonenumber');
   const phoneValue = e.target.value;
   const phoneName = e.target.name
   const pn = new PhoneNumber(phoneValue, 'NG')
   const pa = pn.toJSON();

   return (pa.valid && pa.possible && !isNaN(phoneValue)) ? true : false
}

export const otpValidation = (e) => {
   const value = e.target.value;
   if (value.length === 4 ) {
      return true
   }
   else {
      return false
   }
}