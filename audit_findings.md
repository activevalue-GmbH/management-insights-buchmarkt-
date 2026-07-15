# Externe Prüfbefunde

## GitHub-Repository

Das vom Nutzer angegebene öffentliche Repository ist erreichbar, enthält aber aktuell **keine Dateien und keine Commits**.

- Repository: https://github.com/activevalue-GmbH/management-insights-buchmarkt-
- Browserbefund am 15. Juli 2026: „This repository is empty.“

Die einzige vollständige Ausgangsfassung der Anwendung befindet sich daher im bereitgestellten ZIP.

## Deutsche Buchmarktdaten

Die im Dokument genannten deutschen Kennzahlen stimmen nach Abgleich mit aktueller Branchenberichterstattung und der vom Börsenverein bereitgestellten Wirtschaftszahlenseite überein.

- Offizielle Übersichtsseite des Börsenvereins mit Präsentation, Tabellenkompendium und Pressemitteilung: https://www.boersenverein.de/markt-daten/marktforschung/wirtschaftszahlen/
- Branchenbericht „Buchmarkt 2025: Die offiziellen Zahlen“, veröffentlicht am 9. Juli 2026: https://www.boersenblatt.net/news/buchhandel-news/buchmarkt-2025-die-offiziellen-zahlen-430629
- Ergänzende Branchenquelle mit ausführlicher Kennzahlenübersicht: https://buchmarkt.de/2026/07/09/boersenverein-bericht-zeigt-erneut-junge-menschen-kaufen-weniger-buecher-und-lesekompetenz-sinkt/

Verifiziert wurden insbesondere:

- Buchkäufer 10–15 Jahre: −30,6 % gegenüber 2024.
- Buchkäufer 20–29 Jahre: −17,8 %.
- Hörbuchumsatz: +13,2 %.
- E-Book-Umsatzanteil am Publikumsmarkt: 6,3 %.
- Young Adult: +4,8 % Umsatz; New Adult: +9,6 % Umsatz.
- Käuferzahl Young/New Adult: +47,5 % seit 2021; die im Dokument verwendete Konkretisierung von 3,0 auf 4,5 Millionen ist damit plausibel und in der zugrunde liegenden Präsentation zu prüfen.
- Digitale Hörbuchkäufer und Formatmix werden laut Börsenverein aus dem YouGov Shopper Panel beziehungsweise Hörbuch-Kompass gespeist; der Dokumenttext sollte auf die Primärpräsentation beziehungsweise das Tabellenkompendium verlinken.

## Atlantic-Quelle und US-Frühindikator

Der Artikel ist trotz Bezeichnung „August 2026“ bereits online veröffentlicht. Es handelt sich um die August-Druckausgabe, die Online-Veröffentlichung erfolgte am 8. Juli 2026. Die Quelle ist daher nicht zukünftig oder erfunden.

- Atlantic-Artikel: https://www.theatlantic.com/magazine/2026/08/reading-crisis-postliterate-age/687618/
- Atlantic-Pressemitteilung zur August-Ausgabe: https://www.theatlantic.com/press-releases/2026/07/atlantics-august-cover-the-age-of-reading-is-over/687836/

Die Aussage, dass rund 20 % der Erwachsenen mehr als 80 % aller gelesenen Bücher ausmachen, wird in der öffentlichen Zusammenfassung des Artikels aufgegriffen. Im Webdokument muss sie weiterhin ausdrücklich als **US-Frühindikator** und nicht als deutsche Marktkennzahl bezeichnet bleiben.

Eine zusätzliche peer-reviewte US-Quelle bestätigt den langfristigen Rückgang des täglichen Lesens zum Vergnügen:

- Bone et al. (2025), „The decline in reading for pleasure over 20 years of the American Time Use Survey“: https://pmc.ncbi.nlm.nih.gov/articles/PMC12496190/
- Kernaussage: In einer national repräsentativen Stichprobe von 236.270 Personen sank die tägliche Leseprävalenz über 2003–2023 im Mittel um etwa 3 % pro Jahr; 49 % der Erwachsenen berichteten 2022, im vergangenen Jahr ein Buch zum Vergnügen gelesen zu haben, gegenüber 61 % im Jahr 1992.

## Produktionslücken der ZIP-Fassung

Die im ZIP enthaltene README nennt selbst noch offene Punkte. Im Code bestätigt wurden:

- kein korrekt eingebundenes Active-Value-Logo; nur Text `active value` im Header,
- relatives OG-Bild statt absoluter Produktions-URL,
- fehlende Canonical-URL und fehlendes `og:url`,
- `mailto:`-CTA als vorläufiger Kontaktweg,
- Tracking-Events werden nur in `window.dataLayer` geschrieben, ohne eingebundene Analytics-Konfiguration,
- finale Mobile-Abnahme steht aus,
- OG-Grafik ist als Platzhalter dokumentiert.

## Responsive-Befund aus dem Quellcode

Das CSS enthält Breakpoints bei 900 px und 620 px und ordnet Mehrspaltenbereiche grundsätzlich korrekt um. Kritische Punkte für die praktische Abnahme sind jedoch:

- feste mobile H1-Größe von 49 px kann auf 320–360 px bei langen deutschen Wörtern beziehungsweise sehr schmalen Browsern zu ungünstigen Umbrüchen führen,
- die große Kennzahl ist mobil auf 106 px festgelegt und sollte fluid begrenzt werden,
- Logo- und Headerhöhen sind nicht für eine echte Bildmarke ausgelegt,
- Fokuszustände für Links und CTA fehlen,
- der CTA besitzt nur Hover-, aber keinen Tastaturfokus- oder Active-Zustand,
- die Donut-Legende wird nur über Farbe differenziert,
- bei deaktiviertem JavaScript bleibt der Inhalt sichtbar; dies ist positiv,
- es gibt keine horizontale Scrollabsicherung für sehr lange URLs/Wörter in Quellen und Kontaktmetadaten.
