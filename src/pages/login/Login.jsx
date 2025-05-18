import { useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { INITIAL_FORM_DATA, validate } from "./loginConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formData)) return;
    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );
      navigate("/game");
      toast.success("User logged in successfully");
      setFormData(INITIAL_FORM_DATA);
    } catch (err) {
      toast(err.message);
    }
  };
  return (
    <div
      className="h-screen w-screen bg-cover bg-no-repeat bg-center flex justify-center flex-col items-center"
      style={{ backgroundImage: "url(/images/Background.png)" }}
    >
      <main className=" flex items-center justify-center">
        <div className="bg-blue-950/30 backdrop-blur-3xl rounded-2xl p-8 w-lg mx-auto border border-blue-800/30 shadow-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Log in
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-white">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full bg-gray-700/40 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-700/40"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-white">
                Password
              </label>
              <div className="relative">
                <input
                  placeholder="********"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-700/40 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-700/40"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-white cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="text-right">
                <p
                  className="text-xs text-blue-300 hover:text-blue-200 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Create an account?
                </p>
              </div>
            </div>
            <div className="text-center">
              <ButtonComponent
                type="submit"
                title="Next"
                handleClick={handleSubmit}
                padding={"10px 100px"}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
