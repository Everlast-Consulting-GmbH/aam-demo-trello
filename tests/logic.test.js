// Tests für die Kernlogik des Aufgabenboards.
// Läuft mit dem eingebauten Node-Testrunner: npm test (= node --test tests/)

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  leeresBoard,
  karteAnlegen,
  karteVerschieben,
  karteLoeschen,
  boardSerialisieren,
  boardDeserialisieren,
} from "../site/logic.js";

test("karteAnlegen legt eine Karte in der richtigen Spalte an", () => {
  const board = karteAnlegen(leeresBoard(), "zu-erledigen", "Angebot schreiben", "karte-1");

  assert.equal(board["zu-erledigen"].length, 1);
  assert.equal(board["zu-erledigen"][0].titel, "Angebot schreiben");
  assert.equal(board["in-arbeit"].length, 0);
  assert.equal(board["fertig"].length, 0);
});

test("karteAnlegen ignoriert leere Titel und verändert das alte Board nicht", () => {
  const vorher = leeresBoard();
  const nachher = karteAnlegen(vorher, "zu-erledigen", "   ");

  assert.equal(nachher["zu-erledigen"].length, 0);

  // Reine Funktion: das Original bleibt unangetastet.
  const mitKarte = karteAnlegen(vorher, "zu-erledigen", "Test", "karte-1");
  assert.equal(vorher["zu-erledigen"].length, 0);
  assert.equal(mitKarte["zu-erledigen"].length, 1);
});

test("karteVerschieben bewegt eine Karte von Zu erledigen nach In Arbeit", () => {
  let board = karteAnlegen(leeresBoard(), "zu-erledigen", "Rechnung prüfen", "karte-1");
  board = karteVerschieben(board, "karte-1", "in-arbeit");

  assert.equal(board["zu-erledigen"].length, 0);
  assert.equal(board["in-arbeit"].length, 1);
  assert.equal(board["in-arbeit"][0].titel, "Rechnung prüfen");
});

test("karteLoeschen entfernt genau die richtige Karte", () => {
  let board = karteAnlegen(leeresBoard(), "zu-erledigen", "Bleibt", "karte-1");
  board = karteAnlegen(board, "zu-erledigen", "Fliegt raus", "karte-2");
  board = karteLoeschen(board, "karte-2");

  assert.equal(board["zu-erledigen"].length, 1);
  assert.equal(board["zu-erledigen"][0].id, "karte-1");
});

test("Serialisieren und Deserialisieren ergeben dasselbe Board", () => {
  let board = karteAnlegen(leeresBoard(), "zu-erledigen", "Backup einrichten", "karte-1");
  board = karteVerschieben(board, "karte-1", "fertig");

  const wiederhergestellt = boardDeserialisieren(boardSerialisieren(board));
  assert.deepEqual(wiederhergestellt, board);
});

test("boardDeserialisieren fängt kaputte Daten ab und liefert ein leeres Board", () => {
  assert.deepEqual(boardDeserialisieren("das ist kein JSON"), leeresBoard());
  assert.deepEqual(boardDeserialisieren(null), leeresBoard());
  assert.deepEqual(boardDeserialisieren('{"zu-erledigen": "quatsch"}'), leeresBoard());
});
