Feature: Saucedemo Login

  Scenario: Erfolgreicher Login mit gültigen Zugangsdaten
    Given ich öffne die Saucedemo Login-Seite
    When ich mich mit Benutzername "standard_user" und Passwort "secret_sauce" einlogge
    Then sehe ich die Produktübersicht
  
  Scenario: Ungültiger Login
    Given ich öffne die Saucedemo Login-Seite
    When ich mich mit Benutzername "locked_out_user" und Passwort "secret_sauce" einlogge
    Then sehe ich eine Login-Fehlermeldung