import Header from "../../component/Header";
import ButtonComponent from "../../component/ButtonComponent";
import { useLocation, useNavigate } from "react-router";

const GameOver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score } = location.state;

  return (
    <div
      className="h-screen w-screen bg-cover bg-no-repeat bg-center flex flex-col"
      style={{ backgroundImage: "url(/images/Background.png)" }}
    >
      <div
        className="h-screen w-screen bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url(/images/Backgroundeffect.png)" }}
      >
        <Header />

        <main className="flex-1 flex items-center justify-center mt-20 flex-col">
          <div
            style={{ backgroundImage: "url(/images/circle.png)" }}
            className="bg-cover bg-no-repeat bg-center py-16 text-center flex items-center flex-col h-[400px] bg-blue-950 backdrop-blur-3xl rounded-2xl p-8 w-full max-w-md mx-auto  border-1 border-blue-600 shadow-lg"
          >
            <h1 className="text-4xl text-white font-light uppercase font-jakarta">
              Game <br /> Over
            </h1>
            <p className="text-2xl text-gray-300 font-jakarta my-4 ">
              You have scored
            </p>

            <div className=" py-2 mt-8 bg-blue-950 rounded-3xl w-48  flex items-center justify-center">
              <div className="h-16 w-16 ">
                <img src="/images/Rating.png" className="h-[100%] w-[100%]" />
              </div>
              <h1 className="text-5xl text-white font-light uppercase font-jakarta">
                {score}
              </h1>

              <sub className="text-[14px] text-gray-300 ml-2 ">Points</sub>
            </div>
          </div>

          <ButtonComponent
            handleClick={() => navigate("/leaderboard")}
            title={"Continue"}
            padding="10px 70px"
          />
        </main>
      </div>
    </div>
  );
};

export default GameOver;
