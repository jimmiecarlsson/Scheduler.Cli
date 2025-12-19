# Scheduler-plattformen

Ett komplett schemaläggningssystem bestående av ett .NET WebAPI-backend, domändriven logik och två React-frontends — en för administratörer/contributors och en för publik visning av schemat.

## Projektöversikt

Scheduler-plattformen startade som en konsolapplikation (Scheduler.Cli) för att hantera schemablock och presentatörer. Genom iterativ utveckling växte projektet till ett domänstyrt system med databaslagring, ett fullskaligt WebAPI, autentisering & autorisering samt två användargränssnitt.

### Arkitekturöversikt

- **Scheduler.Cli:** Ursprunglig konsolapplikation där schemalogiken och domänmodellerna formades.

- **Scheduler.WebAPI:** ASP.NET Core WebAPI som levererar schemadata och affärslogik.
- **/frontend/scheduler-web-ui:** React-baserad frontend för hantering av roller, sändningsblock, presentatörer/frilans och deras arvoden.
- **frontend/scheduler-public-ui:** React-baserad frontend som ger besökare möjlighet att se pågående och kommande program. Typ en publik webb.

## Funktioner

### WebAPI
- CRUD-operationer för block och presentatörer
- Betalningsregistrering för frilansare
- Autentisering och rollbaserad autorisering
- Scalar/OpenAPI-dokumentation i devolpment mode.
- EF Core med databas-migreringar
- Validering i backend

### Domänlogik
- Entiteter: ScheduleBlock, Presenter, PaymentRecord, Contributor
- Tidslogik och relationer mellan modellerna
- Identity-koppling mot användare i databasen

### scheduler-web-ui
- Säkerhetsstyrda admin-sidor
- Hantering av roller och make-contributor
- Skapande/ändring av schemablock
- Tilldelning av presentatörer om du är inloggad som en frilans.
- Visning och registrering av när en frilansanvändare väljer att bli presentatör för ett tom sändningsblock.

### Publik-Frontend
- API-baserad visning av aktuella och kommande block

## Teknisk Miljö
- **Backend:** .NET, ASP.NET Core WebAPI, EF Core, Identity
- **/frontend/scheduler-web-ui:** React, React Router, cookie-baserad authensiering.
- **/frontend/scheduler-web-ui:** React, sändningsinformation från API och statiska states.
- **Databas:** SQLite, EF Core-migreringar och relationsmodeller

## Utvecklingsresa
Systemet började som en enkel konsolapplikation och utvecklades vidare genom:

1. Initial logik i CLI för schemaläggning
2. Införande av domändrivna strukturer
3. Flytt till EF Core med databaslagring
4. Skapande av WebAPI som kärna
5. Admin-UI med rollhantering
6. Publik UI som visar sändningsinformation från API

Varje steg har byggt vidare på tidigare erfarenheter och gjort systemet starkare och mer realistiskt.

## Licens

Projektet är ett pågående utbildnings- och utvecklingsarbete.
