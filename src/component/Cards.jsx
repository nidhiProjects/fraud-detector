import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import ButtonComponent from "./ButtonComponent";
import { useNavigate } from "react-router";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db, auth } from "../Firebase";
import { TOTAL_ITEMS } from "../utils/globalConfig";
import Score from "./Score";

const Cards = () => {
  const [items, setItems] = useState(TOTAL_ITEMS);
  const [choiceMade, setChoiceMade] = useState(null);
  const [score, setScore] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const navigate = useNavigate();

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 5,
    infinite: false,
    speed: 500,
    arrows: false,
    focusOnSelect: true,
  };

  const saveScoreToFirestore = async (score) => {
    const user = auth.currentUser;

    if (!user) {
      toast.error("User not logged in.");
      return;
    }

    try {
      const userScoresRef = collection(db, "users", user.uid, "scores");

      await addDoc(userScoresRef, {
        score,
        createdAt: serverTimestamp(),
      });
      await addDoc(collection(db, "allScores"), {
        uid: user.uid,
        name: user.displayName || "Anonymous",
        score,
        createdAt: serverTimestamp(),
      });

      toast.success("Score saved successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClick = () => {
    setItems(items.filter((item) => item?.id !== choiceMade?.id));
    setChoiceMade(null);
    setCorrectAnswer(null);
    if (items.length === 1) {
      saveScoreToFirestore(score);
      navigate("/gameover", { state: { score: score } });
    }
  };

  return (
    <>
      <Score score={score} />
      <div className="w-full flex items-center justify-center ">
        <div className="w-[90%]">
          <Slider {...settings}>
            {items.map((item, index) => (
              <Card
                key={index}
                data={item}
                setChoiceMade={setChoiceMade}
                choiceMade={choiceMade}
                setScore={setScore}
                setCorrectAnswer={setCorrectAnswer}
              />
            ))}
          </Slider>

          <div className="text-center ">
            {correctAnswer && correctAnswer?.isCorrect === "YES" ? (
              <div className="text-white  border border-green-400 mx-auto w-max px-20 rounded-2xl bg-green-800/20 py-2">
                {correctAnswer?.message}
              </div>
            ) : correctAnswer && correctAnswer?.isCorrect === "NO" ? (
              <div className="text-white  border border-red-400 mx-auto w-max px-20 rounded-2xl bg-red-800/20 py-2">
                {correctAnswer?.message}
              </div>
            ) : null}
          </div>

          <div className="flex justify-center">
            <ButtonComponent
              handleClick={handleClick}
              title="Next"
              padding="10px 70px"
              className={choiceMade ? "visible m-0" : "invisible m-0"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
