---
name: neues-feature
description: Nutze diesen Skill, wenn ein neues Feature gebaut werden soll, zum Beispiel "bau eine Suchfunktion" oder "füge Fälligkeitsdaten hinzu". Er führt durch den Team-Workflow von Plan bis Pull Request.
---

# Neues Feature bauen

So läuft jedes neue Feature in diesem Repo. Die Schritte der Reihe nach abarbeiten,
keinen überspringen.

1. **Plan formulieren und bestätigen lassen.** Kurz beschreiben, was gebaut wird und
   welche Dateien sich ändern. Erst weitermachen, wenn der Mensch den Plan bestätigt hat.
2. **Feature-Branch von `main` erstellen.** Name `feature/<kurz>`, zum Beispiel
   `feature/suchfeld`. Nie direkt auf `main` arbeiten.
3. **Bauen in `site/`, in kleinen Schritten.** Kernlogik als reine Funktionen nach
   `site/logic.js`, DOM-Code nach `site/app.js`. Nach jedem Schritt prüfen, ob die App
   noch läuft.
4. **Tests ergänzen in `tests/`** für die neue Logik. Dann `npm test` ausführen, alles
   muss grün sein.
5. **Deutsche Commits.** Einzeilige, deutsche Commit-Messages, die den Schritt beschreiben.
6. **Push und Pull Request** per `gh pr create`. Beschreibung auf Deutsch mit den drei
   Punkten Was, Warum, Wie getestet.
7. **Checks abwarten** per `gh pr checks` und das Ergebnis melden: grün oder rot, bei rot
   auch warum.
8. **NIE selbst mergen.** Ob der Pull Request nach `main` übernommen wird, entscheidet
   der Mensch.
