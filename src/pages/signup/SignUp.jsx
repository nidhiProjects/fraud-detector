import { useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
import { INITIAL_FORM_DATA, validate } from "./signupConfig";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formData)) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData?.email.trim(),
        formData?.password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: formData.name.trim() });
      setFormData(INITIAL_FORM_DATA);
      toast.success("User Created Successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div
      className="h-screen w-screen bg-cover bg-no-repeat bg-center flex flex-col"
      style={{ backgroundImage: "url(/images/Background.png)" }}
    >
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-blue-950/30 backdrop-blur-3xl rounded-2xl p-8 w-lg mx-auto border border-blue-800/30 shadow-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Register Yourself
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 grid grid-cols-2 gap-2"
          >
            <div className="col-span-2 space-y-2">
              <label className="block text-white">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-700/40 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-700/40"
                required
                placeholder="Amulya"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white">Email ID</label>
              <input
                type="email"
                name="email"
                placeholder="Amulya@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-700/40 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-700/40"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white">Phone No.</label>
              <input
                type="number"
                name="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-700/40 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-700/40"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  placeholder="******"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-700/40 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-700/40"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-white"
                >
                  {showPassword.password ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-white">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="******"
                  className="w-full bg-gray-700/40 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-700/40"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-white"
                >
                  {showPassword.confirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            <div className="col-span-2 text-right">
              <p
                className="text-xs text-blue-300 hover:text-blue-200 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Already have an account?
              </p>
            </div>

            <div className="col-span-2 text-center">
              <ButtonComponent
                title="Continue"
                type="submit"
                padding="10px 100px"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
