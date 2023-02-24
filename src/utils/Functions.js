import * as data from "./world.json";
const countries = data.default;

export function getRandomCountries() {
  let countriesChoosen = [];
  while (countriesChoosen.length <= 3) {
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    if (countriesChoosen.some((c) => c.id === randomCountry.id)) continue;
    countriesChoosen.push(randomCountry);
  }

  return countriesChoosen;
}

export function formatData() {
  const gameData = [];
  let winnerCountry;
  let randomCountries = getRandomCountries();

  for (const country of randomCountries) {
    gameData.push({ ...country });
  }

  winnerCountry = gameData.at(-1);

  return { options: gameData, correct: { winnerCountry } };
}

export function hideChars(str) {
  console.log(str);
  const cantidadOcultar = Math.floor(str.length * 0.7);

  const indicesOcultar = [];
  while (indicesOcultar.length < cantidadOcultar) {
    const indice = Math.floor(Math.random() * str.length);
    if (!indicesOcultar.includes(indice)) {
      indicesOcultar.push(indice);
    }
  }

  let resultado = "";
  for (let i = 0; i < str.length; i++) {
    if (indicesOcultar.includes(i)) {
      resultado += "_";
    } else {
      resultado += str[i];
    }
  }
  return resultado;
}
