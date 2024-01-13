const validateEmailDomains = (ValueEmail) => {
  let EmailSplit = ValueEmail.split("@");
  EmailSplit = EmailSplit[1];
  let domainsArray = EmailSplit.split(".");
  const tempArrayDuplicate = [];
  for (let i = 0; i < domainsArray.length; i++) {
    if (domainsArray[i + 1] === domainsArray[i]) {
      tempArrayDuplicate.push(domainsArray[i]);
    }
  }
  if (tempArrayDuplicate.length === 0) {
    return true;
  } else {
    //alert('Ingrese un email correcto')
    return false;
  }
};

export const validateName = (name) => {
  var re = /^[a-zA-ZñÑ\s]{3,}$/;
  return re.test(name);
};

export const validateLastName = (name) => {
  var re = /^[a-zA-ZñÑ\s]{3,}$/;
  return re.test(name);
};

export const validatePhone = (phone) => {
  var re = /^(09|\+5939)\d{8}$/;

  return re.test(phone);
};

export const validateAddress = (address) => {
  // const isvalid = address.length;
  // if (isvalid <= 5) {
  //   return false;
  // } else {
  //   return true;
  // }
};
export const validateToken = (token) => {
  // const isvalid = address.length;
  // if (isvalid <= 5) {
  //   return false;
  // } else {
  //   return true;
  // }
};

export const validateEmail = (email) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = re.test(email);
  if (!isValid) {
    return false;
  } else {
    return validateEmailDomains(email);
  }
};

export const letter = (letter) => {
  var re = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

  return re.test(letter);
};

export const number = (number) => {
  var re = /^(?=.*\d).+$/;

  return re.test(number);
};

export const specialCaracter = (caracter) => {
  var re = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;

  return re.test(caracter);
};
