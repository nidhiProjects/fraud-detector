import { useRef, useState } from "react";
import { motion } from "motion/react";

const Card = ({ data, setChoiceMade, choiceMade, setScore,setCorrectAnswer }) => {
  const [startingPosition, setStartingPosition] = useState(null);
  const [choice, setChoice] = useState(null);

  const ref = useRef(null);

  const handleDragStart = () => {
    const drag = ref?.current?.getBoundingClientRect();
    setStartingPosition(drag.y);
  };
  const handleDragEnd = () => {
    const endingPosition = ref?.current?.getBoundingClientRect().y;
    if (startingPosition === endingPosition) return;
    if (endingPosition < 0) {
      setChoice(data.isImageFake ? "CORRECT" : "WRONG");
      setScore((prev) => (data.isImageFake ? prev + 5 : prev - 5));
      setChoiceMade(data);
      setStartingPosition(null);
      setCorrectAnswer({
        message:data.isImageFake ? "It's a fraud message":"It's a safe message",
        isCorrect : data.isImageFake ? "YES" : "NO"
      })
    }
    if (endingPosition - startingPosition > 150) {
      setChoice(data.isImageFake ? "WRONG" : "CORRECT");
      setScore((prev) => (data.isImageFake ? prev - 5 : prev + 5));
      setChoiceMade(data);
      setStartingPosition(null);
     setCorrectAnswer({
        message:data.isImageFake ? "It's a fraud message":"It's a safe message",
        isCorrect : data.isImageFake ? "NO" : "YES"
      })
    }
  };
  return (
    <>
      <motion.div
        ref={ref}
        drag={choice && choiceMade ? false : "y"}
        dragDirectionLock
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        whileDrag={{ cursor: "grabbing" }}
        className="py-4"
      >
        <div
          style={{ backgroundImage: `url(${data.imageUrl})` }}
          className={`carousel-item bg-cover bg-no-repeat bg-center ${
            choice === "WRONG" && choiceMade
              ? "wrong"
              : choice === "CORRECT" && choiceMade
              ? "correct"
              : ""
          }`}
        ></div>
      </motion.div>
     
    </>
  );
};

export default Card;
