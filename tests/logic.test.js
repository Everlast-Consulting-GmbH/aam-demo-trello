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
  const board = karteAnlegen(leeresBoard(), "zu-erledigen", "Angebot schreiben", "grau", "karte-1");

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
  const mitKarte = karteAnlegen(vorher, "zu-erledigen", "Test", "grau", "karte-1");
  assert.equal(vorher["zu-erledigen"].length, 0);
  assert.equal(mitKarte["zu-erledigen"].length, 1);
});

test("karteAnlegen speichert die gewählte Farbe an der Karte", () => {
  const board = karteAnlegen(leeresBoard(), "zu-erledigen", "Wichtige Aufgabe", "gelb", "karte-1");

  assert.equal(board["zu-erledigen"][0].farbe, "gelb");
});

test("karteAnlegen fällt bei unbekannter Farbe auf grau zurück", () => {
  const ohneFarbe = karteAnlegen(leeresBoard(), "zu-erledigen", "Ohne Farbwunsch");
  const kaputteFarbe = karteAnlegen(leeresBoard(), "zu-erledigen", "Neonpink bitte", "neonpink");

  assert.equal(ohneFarbe["zu-erledigen"][0].farbe, "grau");
  assert.equal(kaputteFarbe["zu-erledigen"][0].farbe, "grau");
});

test("karteVerschieben bewegt eine Karte von Zu erledigen nach In Arbeit", () => {
  let board = karteAnlegen(leeresBoard(), "zu-erledigen", "Rechnung prüfen", "blau", "karte-1");
  board = karteVerschieben(board, "karte-1", "in-arbeit");

  assert.equal(board["zu-erledigen"].length, 0);
  assert.equal(board["in-arbeit"].length, 1);
  assert.equal(board["in-arbeit"][0].titel, "Rechnung prüfen");
  assert.equal(board["in-arbeit"][0].farbe, "blau");
});

test("karteLoeschen entfernt genau die richtige Karte", () => {
  let board = karteAnlegen(leeresBoard(), "zu-erledigen", "Bleibt", "grau", "karte-1");
  board = karteAnlegen(board, "zu-erledigen", "Fliegt raus", "grau", "karte-2");
  board = karteLoeschen(board, "karte-2");

  assert.equal(board["zu-erledigen"].length, 1);
  assert.equal(board["zu-erledigen"][0].id, "karte-1");
});

test("Serialisieren und Deserialisieren ergeben dasselbe Board (inklusive Farbe)", () => {
  let board = karteAnlegen(leeresBoard(), "zu-erledigen", "Backup einrichten", "gruen", "karte-1");
  board = karteVerschieben(board, "karte-1", "fertig");

  const wiederhergestellt = boardDeserialisieren(boardSerialisieren(board));
  assert.deepEqual(wiederhergestellt, board);
  assert.equal(wiederhergestellt["fertig"][0].farbe, "gruen");
});

test("boardDeserialisieren fängt kaputte Daten ab und liefert ein leeres Board", () => {
  assert.deepEqual(boardDeserialisieren("das ist kein JSON"), leeresBoard());
  assert.deepEqual(boardDeserialisieren(null), leeresBoard());
  assert.deepEqual(boardDeserialisieren('{"zu-erledigen": "quatsch"}'), leeresBoard());
});
