import { formatData, hideChars } from "./utils/Functions";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [winner, setWinner] = useState({});
  const [end, setEnd] = useState(false);
  const [points, setPoints] = useState(0);
  const [hint, setHint] = useState("");
  const [viewHint, setViewHint] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    let newData = formatData();

    setPoints(parseInt(localStorage.getItem("points") || 0));
    setCountries(newData.options.sort(() => Math.random() - 0.5));
    setWinner(newData.correct.winnerCountry);

    setViewHint(false);
    let hidden = hideChars(newData.correct.winnerCountry.name);
    setHint(hidden);
  }, []);

  const handleOptionClick = (e) => {
    let { textContent } = e.target;
    setEnd(true);

    if (textContent === winner.name) {
      e.target.classList.add("correct");
      localStorage.setItem("points", parseInt(points) + 1);
      setPoints(parseInt(points) + 1);

      if (parseInt(points) % 5 == 0) {
        setT(0);
      }
    } else {
      document.querySelectorAll(".gameOption").forEach((el) => {
        if (el.textContent == winner.name) {
          return el.classList.add("correct");
        }
      });
      e.target.classList.add("incorrect");
      localStorage.setItem("points", 0);
      setPoints(0);
    }
  };

  const handleClick = async () => {
    document
      .querySelectorAll(".gameOption")
      .forEach((el) => el.classList.remove("incorrect", "correct"));
    setEnd(false);

    let newData = formatData();

    setCountries(newData.options.sort(() => Math.random() - 0.5));
    setWinner(newData.correct.winnerCountry);

    setViewHint(false);
    let hidden = hideChars(newData.correct.winnerCountry.name);
    setHint(hidden);
  };

  const handleHint = () => {
    if (t == 0) {
      setViewHint(true);
      setTimeout(() => {
        setViewHint(false);
        setT(1);
      }, 3000);
    }
  };

  return (
    <main className="container">
      <h1>ADIVINÁ LA BANDERA</h1>
      <div className="gameContainer">
        <h5>¿De qué país es?</h5>
        <img
          src={`../public/assets/${winner.alpha2}.png`}
          alt="MUESTRA"
          className="imgGuess"
        />
        <p className="pointsP">
          Racha: <span>{points}</span>
        </p>
        {t == 0 && (
          <span
            title="OJO EH, las pistas solamente se pueden usar una vez cada 5 puntos."
            className="hint"
            onClick={handleHint}
          >
            {viewHint ? hint : "Ver Pista"}
          </span>
        )}
        <div className="gameOptions">
          {countries.map((c) => (
            <div key={c.id}>
              <button
                onClick={handleOptionClick}
                className="gameOption"
                disabled={end}
              >
                {c.name}
              </button>
            </div>
          ))}
        </div>
        <button className="next" onClick={handleClick} disabled={!end}>
          Siguiente
        </button>
      </div>
    </main>
  );
}

export default App;
