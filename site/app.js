// Verbindung zwischen Kernlogik (logic.js) und Seite (DOM).
// Hier passiert nur Anzeigen und Reagieren, keine Geschäftslogik.

import { SPALTEN, leeresBoard, karteAnlegen } from "./logic.js";

let board = leeresBoard();

const formular = document.getElementById("neue-karte-form");
const titelEingabe = document.getElementById("neue-karte-titel");

formular.addEventListener("submit", (ereignis) => {
  ereignis.preventDefault();
  board = karteAnlegen(board, "zu-erledigen", titelEingabe.value);
  titelEingabe.value = "";
  titelEingabe.focus();
  rendern();
});

function rendern() {
  for (const spalte of SPALTEN) {
    const behaelter = document.querySelector(`[data-karten="${spalte}"]`);
    behaelter.innerHTML = "";
    for (const karte of board[spalte]) {
      behaelter.appendChild(karteAlsElement(karte));
    }
  }
}

function karteAlsElement(karte) {
  const element = document.createElement("article");
  element.className = "karte";
  element.dataset.karteId = karte.id;

  const titel = document.createElement("p");
  titel.className = "karte-titel";
  titel.textContent = karte.titel;
  element.appendChild(titel);

  return element;
}

rendern();
