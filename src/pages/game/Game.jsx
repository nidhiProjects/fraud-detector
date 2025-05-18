import { Mouse } from "lucide-react";
import Cards from "../../component/Cards";
import Header from "../../component/Header";

const Game = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-no-repeat bg-center "
      style={{ backgroundImage: "url(/images/Background.png)" }}
    >
      <main className="relative w-full h-full  flex  flex-col">
        <div className="absolute w-md h-44 top-26 left-[37%]">
          <img className="h-[100%] w-[100%]" src="/images/redMask.png" />
        </div>
        
        <Header />

        <div  className="flex-1 flex justify-center items-center ">
          <div className="card-container   w-[1000px]">
            <Cards />
          </div>
        </div>
        <div className="absolute w-[480px] h-44 bottom-0 left-[35%]">
          
          <img className="h-[100%] w-[100%]" src="/images/greenMask.png" />
        </div>
        <div className="w-full flex justify-center mb-3 ">
      <div className="w-[300px] px-3 py-1 rounded-2xl backdrop-blur-3xl border-1 border-blue-500  bg-blue-900/10  flex items-center justify-between">
       <Mouse color="white"/>
       <h1 className="text-white ">
        Drag “Up” the fraud message and <br /> Drag “Down” the Safe message
       </h1>
       </div>
      </div>
      </main>
    </div>
  );
};

export default Game;
