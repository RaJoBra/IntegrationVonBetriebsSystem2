# Production Wizzard

## Navbar

- Firmen Logo -> Bringt zurück zur Start Seite
- Start -> Start der Berechnung einer Periode
- Stammdaten -> Aufzeigen von Stammdaten( Mengenstücklisten, Strukturstücklisten etc.)
- Handbuch -> Verlinkung des Handbuchs
- Möglichkeit zum Wechsel der Sprache

## Startseite

- Firmenlogo
- Vorstellung von dem Production Wizzard
- Plannung Starten -> Start der Planung
- Stammdaten

## Stammdaten

### Mengenstückliste

- Wie viel von einem Teil notwenig ist für eines der Fahrräder

### Strukturstückliste

- Aufzeigen des zusammenspiels der einzelnen Fahrräder

## Start/Plannung starten

### XML hochladen

- XML-Datei auswählen
- Fortschritt zurücksetzten -> Reset der ganzen Kalkulation

### Prodktionprogramm

- "Perioden n+1..3) -> Prognosen für künftige Perioden eintragen
- Verkaufswunsch, Lagerbestand für P1..P3 werden aus der xml ausgelesen
- Geplanter Sicherheitsbestand n+1
  - Wieviel Fahräderr sollen anfang der nächsten Periode im Lager sein
  - Produktion ermittelt sich durch auflösung von <br>
    'Geplanter Sicherheitsbestand = Lagerbestand - Verkaufswunsch + Produktion'
- Standardmäßig ist für den Geplantensicherheitsbestand 0, was zu negativen Produktionsmengen führt
  - Eintragen von korrekten Mengen behebt diesen Fehler

### Disposition

- Zusätzlich geplanter Lagerbestand
  - Gibt die Möglichkeit einen zusätzlichen Lagerbestand anzugeben

## Fertigungsreihenfolge

- Gibt an welche Artikel zuerst Produziert wird und in welcher Menge
- Teilen -> ermöglicht es die zu prodziertende Menge aufzuspliten

## Kapazitätsplanung

- Wieviel Kapazität wird por Arbeitsplatz aufgewendet
- Wieviel Rüstzeit wird für die Maschine prognostiziert
- Wieviele Schichten, Überstunden werden veranschlagt
- Soll ein zusätlich Puffer eingeplant werden
- Rot unterlegt -> Felder bei denen die maximal Mögliche Zeit überschritten wird
  - Nicht möglich weiter zu machen -> Es muss weniger produziert damit man weiter kann

## Materialplannung

- Muss händisch eintragen wieviel bestellt werden soll
