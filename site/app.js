// Verbindung zwischen Kernlogik (logic.js) und Seite (DOM).
// Hier passiert nur Anzeigen und Reagieren, keine Geschäftslogik.

import {
  SPALTEN,
  karteAnlegen,
  karteVerschieben,
  karteLoeschen,
  boardSerialisieren,
  boardDeserialisieren,
} from "./logic.js";

const SPEICHER_SCHLUESSEL = "aam-demo-aufgabenboard";

// Beim Start das zuletzt gespeicherte Board laden (oder leer beginnen).
let board = boardDeserialisieren(localStorage.getItem(SPEICHER_SCHLUESSEL));

function speichern() {
  localStorage.setItem(SPEICHER_SCHLUESSEL, boardSerialisieren(board));
}

const formular = document.getElementById("neue-karte-form");
const titelEingabe = document.getElementById("neue-karte-titel");

formular.addEventListener("submit", (ereignis) => {
  ereignis.preventDefault();
  const farbe = formular.querySelector('input[name="karten-farbe"]:checked')?.value;
  board = karteAnlegen(board, "zu-erledigen", titelEingabe.value, farbe);
  titelEingabe.value = "";
  titelEingabe.focus();
  speichern();
  rendern();
});

// Drag and Drop: Spalten nehmen gezogene Karten an.
for (const spalte of SPALTEN) {
  const behaelter = document.querySelector(`[data-karten="${spalte}"]`);

  behaelter.addEventListener("dragover", (ereignis) => {
    ereignis.preventDefault();
    behaelter.classList.add("ablage-aktiv");
  });

  behaelter.addEventListener("dragleave", () => {
    behaelter.classList.remove("ablage-aktiv");
  });

  behaelter.addEventListener("drop", (ereignis) => {
    ereignis.preventDefault();
    behaelter.classList.remove("ablage-aktiv");
    const karteId = ereignis.dataTransfer.getData("text/plain");
    board = karteVerschieben(board, karteId, spalte);
    speichern();
    rendern();
  });
}

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
  element.className = "karte farbe-" + (karte.farbe ?? "grau");
  element.dataset.karteId = karte.id;
  element.draggable = true;

  element.addEventListener("dragstart", (ereignis) => {
    ereignis.dataTransfer.setData("text/plain", karte.id);
    ereignis.dataTransfer.effectAllowed = "move";
    element.classList.add("wird-gezogen");
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("wird-gezogen");
  });

  const titel = document.createElement("p");
  titel.className = "karte-titel";
  titel.textContent = karte.titel;
  element.appendChild(titel);

  const loeschKnopf = document.createElement("button");
  loeschKnopf.className = "karte-loeschen";
  loeschKnopf.type = "button";
  loeschKnopf.title = "Karte löschen";
  loeschKnopf.setAttribute("aria-label", "Karte löschen");
  loeschKnopf.textContent = "×";
  loeschKnopf.addEventListener("click", () => {
    board = karteLoeschen(board, karte.id);
    speichern();
    rendern();
  });
  element.appendChild(loeschKnopf);

  return element;
}

rendern();
