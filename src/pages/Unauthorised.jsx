import ButtonComponent from "../component/ButtonComponent";
import { useNavigate } from "react-router";

const Unauthorised = () => {
  const navigate = useNavigate();
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/images/backgroundCircle.png')" }}
    >
      <div className=""></div>
      <div className="text-center text-white  bg-opacity-50 p-8 rounded-xl mt-52">
        <h1 className="text-5xl font-bold mb-4 font-jakarta">CATCH THE FAKE</h1>
        <p className="text-lg font-jakarta text-gray-400 mb-28">
          Beware of Fraud Messages!
          <br />
          Spot the fraud and collect points.
        </p>
        <div className="my-8">
          <ButtonComponent
            title={"Log in"}
            handleClick={() => navigate("/login")}
            padding={"8px 90px"}
          />
        </div>
        <p className="text-sm font-jakarta">
          Don’t have a log in?{" "}
          <span
            className="text-blue-400 underline font-jakarta cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Register yourself
          </span>
        </p>
      </div>
    </div>
  );
};

export default Unauthorised;
