import { useEffect, useState } from "react";
import "./style/style.css";

function Card({ name, image, onClick }) {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <img src={image} alt="" />
      <p>{name}</p>
    </div>
  );
}

function PokemonTable() {
  const [pokemonIndex, setPokemonIndex] = useState([]);
  const [captured, setCaptured] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const url = "https://pokeapi.co/api/v2/pokemon/";
  const pokeList = [
    "ditto",
    "pichu",
    "torchic",
    "bulbasaur",
    "squirtle",
    "zigzagoon",
    "absol",
    "pikachu",
    "trapinch",
    "sandshrew",
  ];

  function shuffle(array) {
    let currentIndex = array.length;
    let shuffledArr = [...array];

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffledArr[currentIndex], shuffledArr[randomIndex]] = [
        shuffledArr[randomIndex],
        shuffledArr[currentIndex],
      ];
    }
    return shuffledArr;
  }

  function handleClick(data) {
    setPokemonIndex((prev) => shuffle([...prev]));
    if (captured.includes(data)) {
      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
      setCaptured([]);
      return;
    }
    setScore(score + 1);
    setCaptured((prev) => [...prev, data]);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Promise.all(
          pokeList.map(async (i) => {
            const data = await fetch(url + i);
            const res = await data.json();
            console.log(res);
            return {
              pokeName: i,
              pokeImg: res.sprites?.other?.home?.front_default,
            };
          })
        );
        setPokemonIndex(shuffle(result));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <div className="header">
        <h1>POKEMON MEMORY GAME</h1>
        <div>
          <p>{`Score: ${score}`}</p>
          <p>{`High Score: ${highScore}`}</p>
        </div>
      </div>
      <div className="pokemon-container">
        {pokemonIndex.map((pokemonData, index) => (
          <Card
            name={pokemonData.pokeName}
            image={pokemonData.pokeImg}
            key={index}
            onClick={() => handleClick(pokemonData.pokeName)}
          />
        ))}
      </div>
    </main>
  );
}

export default function App() {
  return <PokemonTable />;
}
