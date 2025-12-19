# Scheduler-plattformen

Ett komplett schemaläggningssystem bestående av ett .NET WebAPI-backend, domändriven logik och två React-frontends — en för administratörer/contributors och en för publik visning av schemat.

## Projektöversikt

Scheduler-plattformen startade som en konsolapplikation (Scheduler.Cli) för att hantera schemablock och presentatörer. Genom iterativ utveckling växte projektet till ett domänstyrt system med databaslagring, ett fullskaligt WebAPI, autentisering & autorisering samt två användargränssnitt.

### Arkitekturöversikt

- **Scheduler.Cli:** Ursprunglig konsolapplikation där schemalogiken och domänmodellerna formades.
- **Scheduler.WebAPI:** ASP.NET Core WebAPI som levererar schemadata och affärslogik.
- **Scheduler Admin UI:** React-baserad frontend för hantering av användare, block, presentatörer och betalningar.
- **Scheduler Public UI:** React-baserad frontend som ger besökare möjlighet att se pågående och kommande program.

## Funktioner

### WebAPI
- CRUD-operationer för block och presentatörer
- Betalningshantering för contributors
- Autentisering och rollbaserad autorisering
- Swagger/OpenAPI-dokumentation
- EF Core med databas-migreringar

### Domänlogik
- Entiteter: ScheduleBlock, Presenter, PaymentRecord, Contributor
- Tidslogik och relationer mellan modellerna
- Identity-koppling mot användare i databasen

### Admin-Frontend
- Säkerhetsstyrda admin-sidor
- Hantering av användare och contributors
- Skapande/ändring av schemablock
- Tilldelning av presentatörer
- Visning och registrering av betalningar

### Publik-Frontend
- Offentlig vy av schema
- API-baserad visning av aktuella och kommande block

## Teknisk Miljö

- **Backend:** .NET, ASP.NET Core WebAPI, EF Core, Identity
- **Frontend Admin:** React, React Router, JWT-autentisering
- **Frontend Public:** React, schemavisning från API
- **Databas:** EF Core-migreringar och relationsmodeller

## Utvecklingsresa

Systemet började som en enkel konsolapplikation och utvecklades vidare genom:

1. Initial logik i CLI för schemaläggning
2. Införande av domändrivna strukturer
3. Flytt till EF Core med databaslagring
4. Skapande av WebAPI som kärna
5. Admin-UI med rollhantering
6. Publik UI som visar schemainformation från API

Varje steg har byggt vidare på tidigare erfarenheter och gjort systemet starkare och mer realistiskt.

## Framtida möjligheter

Exempel på framtida förbättringar:

- Statistik och rapportering
- Notifieringar till presentatörer
- Vidareutvecklad design i UI
- Molndeploy och CI/CD pipelines
- Automatiserade tester

## Licens

Projektet är ett pågående utbildnings- och utvecklingsarbete.
