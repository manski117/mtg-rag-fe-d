import { useState, useEffect } from "react";
import axios from "axios"; //npm install axios
import { debounce } from "lodash"; //npm install lodash
import mtgCardBack from "../../public/mtg-card-back.png";

interface CardImageProps {
  cardName: string;
}

interface CardImageProps {
  cardName: string;
}

function CardImage({ cardName }: CardImageProps) {
  const [cardData, setCardData] = useState<any>(null);

  // Debounce function to delay fetching card data
  const debouncedFetchCardData = debounce(async () => {
    if (cardName.length < 2) {
      // Only fetch if cardName has at least 3 characters
      setCardData(null);
      return;
    }

    const formattedName = encodeURIComponent(cardName);
    const url = `https://api.scryfall.com/cards/named?fuzzy=${formattedName}`;

    try {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Small delay as per API rules
      const response = await axios.get(url);
      setCardData(response.data);
    } catch (error) {
      console.error("Failed to fetch card data:", error);
      setCardData(null); // Reset on error
    }
  }, 400); // Debounce time of 400 milliseconds

  useEffect(() => {
    debouncedFetchCardData();
    return () => {
      debouncedFetchCardData.cancel(); // Cancel the debounced call on component unmount
    };
  }, [cardName]); // Run effect whenever cardName changes

  return (
    <div className="max-w-[488px] w-full">
      {cardData ? (
        <>
          {cardData.image_uris ? (
            <img className="rounded-xl" src={cardData.image_uris.normal} alt={cardName + " image"} />
          ) : (
            <p>No image available</p>
          )}
        </>
      ) : (
        <img title="select a card in the searchbox above" src={mtgCardBack.src} alt="default card image" />
      )}
    </div>
  );
}

export default CardImage;
