// Kernlogik des Aufgabenboards.
// Bewusst als reine Funktionen ohne DOM-Zugriff gehalten,
// damit sie sich mit dem Node-Testrunner testen lassen.

export const SPALTEN = ["zu-erledigen", "in-arbeit", "fertig"];

// Ein leeres Board: drei Spalten, keine Karten.
export function leeresBoard() {
  return {
    "zu-erledigen": [],
    "in-arbeit": [],
    "fertig": [],
  };
}

// Legt eine neue Karte in einer Spalte an und gibt ein NEUES Board zurück.
// Leere Titel und unbekannte Spalten werden ignoriert.
export function karteAnlegen(board, spalte, titel, id = neueId()) {
  const text = String(titel ?? "").trim();
  if (!SPALTEN.includes(spalte) || text === "") {
    return board;
  }
  const neu = boardKopieren(board);
  neu[spalte].push({ id, titel: text });
  return neu;
}

// Verschiebt eine Karte in eine andere Spalte (ans Ende) und gibt ein NEUES Board zurück.
// Unbekannte Karten oder Spalten lassen das Board unverändert.
export function karteVerschieben(board, karteId, zielSpalte) {
  if (!SPALTEN.includes(zielSpalte)) {
    return board;
  }
  const fund = karteFinden(board, karteId);
  if (!fund) {
    return board;
  }
  const neu = boardKopieren(board);
  neu[fund.spalte] = neu[fund.spalte].filter((karte) => karte.id !== karteId);
  neu[zielSpalte].push({ ...fund.karte });
  return neu;
}

// Löscht eine Karte anhand ihrer Id und gibt ein NEUES Board zurück.
export function karteLoeschen(board, karteId) {
  if (!karteFinden(board, karteId)) {
    return board;
  }
  const neu = boardKopieren(board);
  for (const spalte of SPALTEN) {
    neu[spalte] = neu[spalte].filter((karte) => karte.id !== karteId);
  }
  return neu;
}

// Sucht eine Karte über alle Spalten hinweg.
export function karteFinden(board, karteId) {
  for (const spalte of SPALTEN) {
    const karte = (board[spalte] ?? []).find((eintrag) => eintrag.id === karteId);
    if (karte) {
      return { spalte, karte };
    }
  }
  return null;
}

// Macht aus dem Board einen Text, der sich im Browser speichern lässt.
export function boardSerialisieren(board) {
  return JSON.stringify(board);
}

// Liest ein gespeichertes Board wieder ein.
// Kaputte oder fremde Daten führen bewusst zu einem leeren Board statt zu einem Fehler.
export function boardDeserialisieren(text) {
  let daten;
  try {
    daten = JSON.parse(text);
  } catch {
    return leeresBoard();
  }
  if (typeof daten !== "object" || daten === null) {
    return leeresBoard();
  }
  const board = leeresBoard();
  for (const spalte of SPALTEN) {
    if (!Array.isArray(daten[spalte])) {
      continue;
    }
    board[spalte] = daten[spalte]
      .filter((karte) => karte && typeof karte.id === "string" && typeof karte.titel === "string")
      .map((karte) => ({ id: karte.id, titel: karte.titel }));
  }
  return board;
}

function boardKopieren(board) {
  const kopie = leeresBoard();
  for (const spalte of SPALTEN) {
    kopie[spalte] = (board[spalte] ?? []).map((karte) => ({ ...karte }));
  }
  return kopie;
}

function neueId() {
  return "karte-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}
