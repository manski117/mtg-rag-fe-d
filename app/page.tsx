'use client'
import React, { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"; //npm install react-markdown
import MessageForm from "./components/MessageForm";
import CardImage from "./components/CardImage";
import SearchBar from "./components/SearchBar";
import RandomText from "./components/RandomText";
import RoboFace from "./components/RoboFace";
import Footer from "./components/Footer";

export default function Home() {
  const [message, setMessage] = useState("Loading");
  const [llmMessage, setLlmMessage] = useState<undefined | string>(undefined);
  const [card1, setCard1] = useState<undefined | string>(undefined);
  const [card2, setCard2] = useState<undefined | string>(undefined);
  const [card3, setCard3] = useState<undefined | string>(undefined);
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);
  const [userQuery, setUserQuery] = useState<undefined | string>(undefined);
  const [question, setQuestion] = useState("");

  // This handler updates the shared state when the user finishes editing
  const handleQuestionBlur = useCallback((newQuestion: string) => {
    setQuestion(newQuestion);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault(); // Prevent form from submitting traditionally
      let cards = [card1, card2, card3].filter(Boolean); // Simplify filtering
      let processedQuestion = question;
      setSubmitPressed(!submitPressed);
      setUserQuery(processedQuestion);

      if (cards.length > 0) {
        let relevantCardsString = `Relevant card names include '${cards.join(
          "', '"
        )}'.`;
        processedQuestion += " " + relevantCardsString;
      }
      //"https://magic-judge-rag.onrender.com/api/query" (real endpoint)

      fetch("http://0.0.0.0:8000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: processedQuestion }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLlmMessage(data.llm_response);
          setQuestion(""); // Optionally clear the question after submitting
        });
    },
    [question, card1, card2, card3]
  );

  const handleHardRefresh = () => {
    // This tells the browser to reload the page from the server, not from cache.
    window.location.reload();
  };

  const NoQueryYet = () => {
    return (
      <div>
        <div className="text-lg leading-6">
          <p>
            Ask me a question about Magic the Gathering in the box below. I can
            help make calls on card interactions, judge rulings, and explain
            combos. I have a knowledge of card interactions as well as the Magic
            Comprehensive rules.
          </p>
        </div>
        <MessageForm
          question={question}
          onQuestionBlur={handleQuestionBlur}
          onSubmit={handleSubmit}
        />
      </div>
    );
  };
  const QueryGiven = () => {
    return (
      <div className="flex flex-col w-full max-w-[488px] justify-center items-center mx-auto">
        <h4 className="text-center p-4 font-semibold text-lg lg:text-xl animate-fade">
          Waiting on answer
        </h4>
        <RoboFace />
        <RandomText />
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-base-300 h-fit">
      <header className="w-fit text-3xl lg:text-5xl mx-auto serif label-text">
        <h1 className="w-fit text-3xl lg:text-5xl mx-auto serif label-text mb-[10px]">
          Magic Judge Bot
        </h1>
      </header>
      <main className="bg-base-300 w-[360px] sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1024px] p-5 mx-auto flex flex-col lg:flex-row">
        <section className="lg:max-w-[70%] md:pr-5 label-text mb-12 lg:mr-8 xl:mr-12 h-fit">
          <div className="sans">
            <h2 className="text-xl md:text-xl xl:text-3xl mb-4 xl:mb-6">
              I am an experimental judge bot powered by an LLM
            </h2>
          </div>
          <div>
            {llmMessage == undefined ? (
              <div>{submitPressed ? <QueryGiven /> : <NoQueryYet />}</div>
            ) : (
              <div className="llm-response text-lg">
                <h3>Your Question:</h3>
                <p>{userQuery}</p>
                <h3 className="mt-4">Judgebot Answer:</h3>
                <ReactMarkdown>{llmMessage}</ReactMarkdown>
                <button onClick={handleHardRefresh} aria-label="Refresh for a new question" className="btn mt-12 mx-auto w-full text-[20px]">
                  Ask another question!
                </button>
              </div>
            )}
          </div>
        </section>
        <h6 className="label-text text-lg flex lg:hidden">
          Look up card spelling here:
        </h6>
        <aside className="lg:max-w-[25%] flex flex-col gap-y-[480px] sm:gap-y-[535px] md:gap-y-[720px] lg:gap-y-[290px] xl:gap-y-[375px] h-[1100px] sm:h-[1180px] md:h-[1600px] lg:h-[700px] xl:h-[900px]">
          <SearchBar setResults={setCard1} />
          <SearchBar setResults={setCard2} />
        </aside>
      </main>
      <Footer/>
    </div>
  );
}
