import React from "react";

const Score = ({score}) => {
  return (
    <div className=" py-1 px-3 mt-8 absolute top-14 right-[45%]  border-1 border-blue-500 bg-blue-950 rounded-full w-32  flex items-center justify-between">
      <div className="h-10 w-10 ">
        <img src="/images/Rating.png" className="h-[100%] w-[100%]" />
      </div>
      <h1 className="text-2xl text-white font-light uppercase font-jakarta">
        {score}
      </h1>

    </div>
  );
};

export default Score;
