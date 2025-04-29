import React, { useState, useCallback } from "react";

interface MessageFormProps {
  question: string;
  onQuestionBlur: (newQuestion: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

function MessageForm({ question, onQuestionBlur, onSubmit }: MessageFormProps) {
  // Local state to handle text area changes
  const [localQuestion, setLocalQuestion] = useState(question);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  // Update local state as user types
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalQuestion(event.target.value);

    // clear existing timer if there is one
    if (timerId) {
      clearTimeout(timerId);
    }

    // set a new timer
    const newTimerId = setTimeout(() => {
      // when a user stops typing, update the global state:
      onQuestionBlur(localQuestion);
    }, 2000); //time delay

    setTimerId(newTimerId);
  };

  // Commit changes to the shared state when user leaves the textarea
  const handleBlur = () => {
    onQuestionBlur(localQuestion);
  };

  return (
    <section>
      <form className="mb-10 mt-8" onSubmit={onSubmit}>
        <label className="label-text" htmlFor="question">
          <h3 className="text-xl lg:text-2xl mb-2">
            Ask Judge Bot a question below:
          </h3>
        </label>
        <textarea
          value={localQuestion}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={3000}
          placeholder="Can a creature with infect deal combat damage?"
          className="w-full input h-[200px] text-md lg:text-lg textarea"
        />
        {/* <textarea
          name="question"
          className="w-full input h-[200px] text-md lg:text-lg"
          id="question"
          value={question}
          placeholder="Can a creature with infect deal combat damage?"
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={3000}
        ></textarea> */}
        <button
          className="btn w-full uppercase text-lg lg:text-2xl"
          type="submit"
        >
          Submit your question
        </button>
      </form>
      <h6 className="text-sm italic">Tips for best results:</h6>
      <ul className="text-sm italic list-disc pl-[17px]">
        <li>
          Please ask me questions in plain English the way you would to a magic
          judge.
        </li>
        <li>Be sure to spell the names of any cards or mechanics correctly.</li>
        <li>
          If you cannot remember how a card is spelled, feel free to use the card
          search boxes. I will be able to get the card spelling from there.
        </li>
      </ul>
    </section>
  );
}

export default MessageForm;