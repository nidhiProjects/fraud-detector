import { useRef } from "react";
import Header from "../../component/Header";
import ButtonComponent from "../../component/ButtonComponent";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../../Firebase";
import { useNavigate } from "react-router";
import html2canvas from "html2canvas-pro";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const usersRef = collection(db, "allScores");
      const q = query(usersRef, orderBy("score", "desc"), limit(10));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc, index) => ({
        rank: index + 1,
        name: doc.data().name || "Anonymous",
        points: doc.data().score || 0,
        initial: doc.data().name.slice(0, 1) || "A",
        highlight: user.displayName === doc.data().name,
      }));

      setLeaders(data);
    };

    fetchLeaderboard();
  }, [db]);

  const componentRef = useRef(null);

  const takeScreenshot = async () => {
    if (componentRef.current) {
      const canvas = await html2canvas(componentRef.current);
      const imgData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imgData;
      link.download = "screenshot.png";
      link.click();
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-no-repeat bg-center flex flex-col"
      style={{ backgroundImage: "url(/images/Background.png)" }}
    >
      <Header />

      <main className="flex-1 flex items-center justify-center  flex-col">
        <div
          ref={componentRef}
          style={{ backgroundImage: "url(/images/circle.png)" }}
          className="bg-cover bg-no-repeat bg-center py-8 text-center flex items-center flex-col h-[480px] bg-blue-950 backdrop-blur-3xl rounded-2xl p-8 w-full max-w-lg mx-auto  border-1 border-blue-600 shadow-lg"
        >
          <h2 className="text-white text-xl font-semibold text-center mb-4 uppercase">
            🏆 Leaderboard
          </h2>
          <div
            className="space-y-2 w-[450px] overflow-y-auto [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-gray-500
            [&::-webkit-scrollbar-track]:rounded-2xl
            [&::-webkit-scrollbar-thumb]:bg-gray-100 
            [&::-webkit-scrollbar-thumb]:rounded-2xl"
          >
            {leaders.map((player, index) => (
              <div
                key={player.rank}
                className={`flex mr-6 items-center justify-between p-3 rounded-lg ${
                  player.highlight
                    ? "bg-blue-600 text-white"
                    : index % 2 === 0
                    ? "bg-gray-500 text-gray-300"
                    : "bg-gray-700 text-gray-300"
                } hover:bg-blue-700`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold">
                    {player.rank}
                  </span>
                  <div
                    className={`w-8 h-8 text-black rounded-full flex items-center justify-center  text-sm ${
                      player.highlight
                        ? "bg-blue-400"
                        : index % 2 === 0
                        ? "bg-blue-600"
                        : "bg-blue-400"
                    }`}
                  >
                    {player.initial}
                  </div>
                  <span className="font-medium">{player.name}</span>
                </div>
                <span className="font-medium">{player.points} points</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <ButtonComponent
            handleClick={takeScreenshot}
            title={"Save"}
            padding="10px 70px"
          />
          <ButtonComponent
            handleClick={() => navigate("/game")}
            title={"Play Again"}
            padding="10px 50px"
          />
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
