import { toast } from "react-toastify";

export const INITIAL_FORM_DATA = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }  

  export const validate = (formData) => {
    if (!formData.name.trim()) {
      toast.error("Name is mandatory");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("email is mandatory");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid Email Address");
      return false;
    }
    if (!formData.phone.toString().trim()) {
      toast.error("Password is mandatory");
      return false;
    }
    if (formData.phone.length !== 10) {
      toast.error("Invalid Phone Number");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is mandatory");
      return false;
    }
    if (!formData.confirmPassword.trim()) {
      toast.error("Confirm Password is mandatory");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password doesn't match");
      return false;
    }
    return true;
  };