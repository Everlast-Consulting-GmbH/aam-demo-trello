# CLAUDE.md - Aufgabenboard (AAM Kurs-Demo)

Dieses Projekt ist ein bewusst einfaches Aufgabenboard im Trello-Stil: drei Spalten
(Zu erledigen, In Arbeit, Fertig), Karten anlegen, verschieben, löschen. Gespeichert wird
im Browser per localStorage (ein kleiner Datenspeicher, den der Browser jeder Webseite gibt).
Das Repo ist Kursmaterial für den Zertifikatslehrgang AI-Automations Manager von Everlast
Consulting: Die Teilnehmer lernen hier Repository, Commit, Branch und Pull Request kennen.
Die App selbst ist Nebensache, die Git-Historie ist didaktisch aufgebaut, jeder Commit ist
ein einzelner, nachvollziehbarer Schritt.

## Struktur

- `site/` ist das, was live geht. Die Kernlogik liegt als reine Funktionen (ohne
  Browser-Anteil, dadurch gut testbar) in `site/logic.js`. `site/app.js` macht nur DOM,
  also das Anzeigen und Reagieren im Browser.
- `tests/` enthält die Tests, geschrieben mit node:test (dem Testwerkzeug, das in Node.js
  schon eingebaut ist, keine Zusatzpakete nötig).
- `.github/workflows/tests-und-deploy.yml` ist die GitHub Action: ein Automat, der bei
  jedem Push erst die Tests laufen lässt und nur danach deployt.

## Lokal starten

`python3 -m http.server 8080 --directory site`, dann http://localhost:8080 öffnen.
Ein Doppelklick auf index.html funktioniert nicht: Chrome blockiert JavaScript-Module,
die direkt über file:// geladen werden.

## Arbeitsweise

Erst kurz den Plan nennen und abstimmen, dann bauen. Kleine Schritte, nach jedem Schritt
prüfen. Der Developer-Workflow in diesem Projekt:

1. Businessziel verstehen (was soll besser werden, nicht welche Technik).
2. Plan machen.
3. Plan besprechen und abstimmen.
4. Bauen und in kleinen Schritten iterieren.
5. Testen.
6. Live gehen.
7. Debrief: Learnings kurz festhalten.

## Tests

- Immer `npm test` ausführen. NIE `node --test tests/` ohne Glob, das bricht auf
  aktuellem Node ab.
- Vor jedem Commit laufen lassen.
- Jedes neue Feature bekommt Tests in `tests/`.

## Git

- Features immer auf einem Feature-Branch (`feature/<kurz>`), nie direkt auf `main`.
  Ein Branch ist eine eigene Arbeitslinie, auf der man gefahrlos bauen kann.
- Commit-Messages: deutsch, einzeilig, sie sagen, was der Schritt tut.
- Fertige Features kommen per Pull Request nach `main` (der Vorschlag, die Änderungen in
  den Hauptstand zu übernehmen). Beschreibung auf Deutsch: Was, Warum, Wie getestet.

## Deploy

Ein Push auf `main` löst die GitHub Action aus: erst laufen die Tests, nur bei Grün wird
zu Cloudflare Pages deployt (dem Hosting-Dienst, der die Seite ausliefert). Tests rot
heißt: kein Deploy, die Live-Seite bleibt unverändert.
Live-Adresse: https://trello.kidemos.de

## Grenzen

- Keine Frameworks, kein React, kein Vue. Reines HTML, CSS und JavaScript.
- Keine npm-Dependencies und kein Build-Schritt. Das Repo bleibt absichtlich klein und lesbar.
- Keine Secrets (Passwörter, API-Keys) ins Repo. Die Deploy-Zugänge liegen als GitHub
  Secrets in den Repo-Einstellungen, nicht im Code.
