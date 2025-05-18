import { toast } from "react-toastify";

export const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

export const validate = (formData) => {
  if (!formData.email.trim()) {
    toast.error("email is mandatory");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    toast.error("Invalid Email Address");
    return false;
  }

  if (!formData.password.trim()) {
    toast.error("Password is mandatory");
    return false;
  }

  return true;
};
