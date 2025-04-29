import React, { useEffect, useState } from "react";
import roboFace from "../../public/judgeBot.png";

const RoboFace: React.FC = () => {
  const [animationPlayState, setAnimationPlayState] = useState("running");

  useEffect(() => {
    // Stop all animations after 20 seconds
    const timeout = setTimeout(() => {
      setAnimationPlayState("paused");
    }, 20000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .shimmer {
            animation: shimmer 3s ease-in-out infinite;
            animation-play-state: ${animationPlayState};
          }
        `}
      </style>
      <div className="rotate shimmer">
        <img className="wobble wobbler" src={roboFace.src} alt="" />
      </div>
    </>
  );
};

export default RoboFace;