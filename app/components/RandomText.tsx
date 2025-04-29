import React, { useState, useEffect } from "react";

const RandomText: React.FC = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  // Predefined list of strings
  const strings = [
    "Shuffling deck...",
    "Judgebot processing...",
    "Tapping lands for mana...",
    "Casting creature: Judge bot",
    "Judgebot gaining haste...",
    "Declaring attackers...",
    "Processing question...",
    "Going infinite...",
    "Declaring blockers...",
    "Resolving the stack...",
    "Entering the infinite...",
    "Analyzing card database...",
    "Generating response...",
    "Consulting compendium...",
    "Planeswalking...",
    "Flipping table...",
    "Thinking deeply about your question...",
    "Hang tight, this will only be a minute...",
    "Don't worry, you're not the first one with this question.",
    "Good question!",
    "Finding a way to make this about Jace Baleren...",
    "Searching card database...",
    "Ensuring quality response...",
    "Feeling awfully judgy...",
    "Shaving neckbeard...",
    "Tapping creatures...",
    "Checking board state...",
    "Beep boop beep!",
    "*robot noises*",
    "Recovering from summoning sickness...",
    "Summoning questing beast...",
    "Finally reading the third clause of questing beast...",
    "Carefully considering this comma placement...",
    "Wow, you play THAT card?",
    "LOL. Noob."
  ];

  // Function to get a random string from the list
  const getRandomString = () =>
    strings[Math.floor(Math.random() * strings.length)];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setCurrentText(getRandomString());
      }, 3000); // Change text every 3 seconds
    }

    // Stop changing after 20 seconds
    timeout = setTimeout(() => {
      clearInterval(interval);
      setIsActive(false);
      setCurrentText("Oops, something may be wrong with judge bot...");
    }, 50000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive]);

  return (
    <div className="flex justify-center items-center h-[100px] w-full">
      <div className="text-center p-4 font-semibold text-lg lg:text-xl animate-fade">
        {currentText}
      </div>
    </div>
  );
};

export default RandomText;