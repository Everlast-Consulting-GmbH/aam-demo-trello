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
