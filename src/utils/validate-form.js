import { isValid } from "./email-validation";

function validateLoginForm(email, password, toast) {
  const isEmailValid = isValid(email);

  if (!isEmailValid && password.trim().length === 0) {
    toast.error("All Fields are required");
    return false;
  }

  if (!isEmailValid) {
    toast.error("Please Enter valid email");
    return false;
  }

  if (isEmailValid && password.trim().length <= 5) {
    toast.error("Password must be greater than '5' character");
    return false;
  }
  return true;
}

function validateSignupForm(email, password, phone, name, toast) {
  const isEmailValid = isValid(email);

  if (
    email.trim().length === 0 ||
    password.trim().length === 0 ||
    phone.trim().length === 0 ||
    name.trim().length === 0
  ) {
    toast.error("All Fields are required");
    return false;
  }

  if (name.trim().length <= 4) {
    toast.error("Enter Valid Full Name");
    return false;
  }

  if (!isEmailValid) {
    toast.error("Please Enter valid email");
    return false;
  }

  if (isEmailValid && password.trim().length <= 5) {
    toast.error("Password must be greater than '5' character");
    return false;
  }
  if (phone.trim().length <= 9) {
    toast.error("Phone Number must be of '10' digit");
    return false;
  }
  return true;
}

export { validateLoginForm, validateSignupForm };
