import { Menu, X } from "lucide-react";
import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Header = () => {
  const [active, setActive] = useState(false);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <header className="w-full  p-2 relative ">
      <div className="h-24 rounded-2xl backdrop-blur-3xl border-1 border-blue-500  bg-blue-900/20 relative flex items-center justify-center px-6">
        <h1 className="text-4xl font-bold font-jakarta text-white text-center">
          CATCH THE FAKE
        </h1>
        <div
          className="absolute right-6 cursor-pointer"
          onClick={() => setActive((prev) => !prev)}
        >
          {active ? (
            <X size={40} color="white" />
          ) : (
            <Menu size={40} color="white" />
          )}
        </div>
      </div>
      {active && (
        <div className="p-4  absolute z-9 rounded-2xl backdrop-blur-3xl border-blue-900/40  bg-blue-900/20 top-[100%]  right-4 flex-col text-white flex items-center justify-center px-16">
          <p className="uppercase text-2xl">Welcome👋, {user?.displayName}</p>
          <div>
            <ButtonComponent
              handleClick={handleLogout}
              title={"Log out"}
              padding="10px 80px"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
