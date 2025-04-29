import React, { useState, useRef, useEffect } from "react";
import CardImage from "./CardImage";

interface SearchBarProps {
    setResults: (result: string) => void;  // Define the type for setResults function
  }

function SearchBar({ setResults }: SearchBarProps) {
  const [input, setInput] = useState<string>("");
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null); // Ref for the wrapper div

  useEffect(() => {
    // Function to check if clicked outside of component
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setAutocompleteResults([]); // Clear results if click outside
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs once on mount and unmount

  function fetchData(value: string) {
    if (value.trim() === "") {
      setAutocompleteResults([]);
      return;
    }
    fetch("https://api.scryfall.com/cards/autocomplete?q=" + encodeURIComponent(value))
      .then((response) => response.json())
      .then((json) => {
        setAutocompleteResults(json.data || []);
      });
  }

  function handleChange(value: string) {
    setInput(value);
    fetchData(value);
  }

  function handleSelect(name: string) {
    setInput(name);
    setResults(name);
    setAutocompleteResults([]);
  }

  return (
    <div ref={wrapperRef} className="input-wrapper relative w-full max-w-[488px] h-[50px]">
      <input
        className="z-10 searchbar input text-base-content w-full max-w-[488px] my-2"
        placeholder="Look up relevant cards here..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <ul className="z-10 dropdown absolute top-[64px] left-0 right-0 results-list overflow-y-scroll max-h-[150px] bg-base-100">
        {autocompleteResults.map((name) => (
          <li 
            key={name}
            className="result-item cursor-pointer text-base-content hover:bg-gray-800"
            onClick={() => handleSelect(name)}
            role="button"
            aria-label={`Select card name ${name}`}
          >
            {name}
          </li>
        ))}
      </ul>
      <CardImage cardName={input} />
    </div>
  );
}

export default SearchBar;