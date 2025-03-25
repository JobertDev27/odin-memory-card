import { useEffect, useState } from "react";
import "./style/card.css";

export default function App() {
  const [data, setData] = useState({ pokeName: "", pokeImg: "" });
  const [database, setDatabase] = useState([]);
  const [captured, setCaptured] = useState([]);
  const [score, setScore] = useState(0);

  const pokemons = [
    "Ditto",
    "Minun",
    "Pichu",
    "Dracovish",
    "Breloom",
    "Pachirisu",
    "Blaziken",
    "Larvitar",
    "Deino",
    "Golbat",
  ];

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          pokemons.map(async (poke) => {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`
            );
            return res.json();
          })
        );

        const formattedData = responses.map((response) => ({
          pokeName: response?.name,
          pokeImg: response?.sprites?.other?.home?.front_default,
        }));

        setDatabase(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (database.length > 0) {
      console.log(score);
      const randomPokemon = database[getRandom(0, database.length)];
      setData(randomPokemon);
    }
  }, [score, database]);

  if (!data.pokeImg) return null;

  return (
    <div className="card-container">
      {database.map((datas, index) => (
        <div
          key={index}
          className="card"
          onClick={() => {
            setScore((prevScore) => prevScore + 1);
            setCaptured((prev) => {
              if (prev.includes(datas.pokeName)) {
                setScore(0);
                return [];
              } else {
                return [...prev, datas.pokeName];
              }
            });
          }}
        >
          <img className="cardImage" src={datas.pokeImg} alt={datas.pokeName} />
          <p className="cardName">{datas.pokeName}</p>
        </div>
      ))}
    </div>
  );
}
