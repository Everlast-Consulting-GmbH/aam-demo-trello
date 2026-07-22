# Aufgabenboard - AAM Demo

Ein bewusst einfaches Aufgabenboard im Trello-Stil: drei Spalten (Zu erledigen, In Arbeit, Fertig),
Karten anlegen, per Drag and Drop verschieben, löschen. Gespeichert wird direkt im Browser
(localStorage), es gibt keinen Server und keine Datenbank.

## Warum gibt es dieses Repo?

Dieses Repo ist Kursmaterial für **Session 38 des Zertifikatslehrgangs AI-Automations Manager**
(Everlast Consulting). Die App selbst ist Nebensache. Das eigentliche Lernobjekt ist die
**Git-Historie**: An diesem Repo werden die Begriffe **Repository, Commit, Branch und Pull Request**
erklärt. Jeder Commit auf `main` ist ein nachvollziehbarer Entwicklungsschritt, den man einzeln
ansehen kann.

## Lokal starten

Es gibt keinen Build-Schritt. Einfach die Startseite im Browser öffnen:

```
git clone https://github.com/Everlast-Consulting-GmbH/aam-demo-trello.git
cd aam-demo-trello
open site/index.html
```

## Tests ausführen

Die Kernlogik (Karten anlegen, verschieben, speichern) liegt als reine Funktionen in
`site/logic.js` und wird mit dem eingebauten Node-Testrunner getestet, ganz ohne Zusatzpakete:

```
npm test
```

## Deployment

Jeder Push auf `main` läuft durch GitHub Actions: erst die Tests, dann der Deploy zu
Cloudflare Pages. Die Live-Version ist unter https://trello.kidemos.de erreichbar.
