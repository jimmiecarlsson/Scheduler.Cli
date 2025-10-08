# 🧭 Scheduler Solution – Clean Architecture (.NET 9)

The **Scheduler** solution demonstrates how a modular, layered architecture can evolve from a simple Console App to a fully functional Web API using **Entity Framework Core** and **SQLite**.  
It follows a *Clean Architecture* pattern, keeping each layer independent and clearly responsible for its own concern.

---

## 🧩 Overview

| Project | Description |
|----------|--------------|
| **Scheduler.Domain** | Contains all core business logic, entities, and value objects. |
| **Scheduler.Application** | Defines use cases, DTOs, and orchestration logic for manipulating domain objects. |
| **Scheduler.Infrastructure** | Provides persistence using Entity Framework Core and SQLite. |
| **Scheduler.Web** | ASP.NET Core Web API exposing endpoints for CRUD operations and OpenAPI (Scalar) documentation. |
| **Scheduler.Cli** | Initial console-based implementation for experimentation and prototyping of scheduling logic. |

---

## 🧱 Scheduler.Domain

The **Domain layer** represents the business core and is completely independent from any external frameworks.

### Key components
- `ScheduleDay` – represents a day in the schedule.
- `ScheduleBlock` – defines a block of time with title, studio, presenters, and guests.
- `Presenter` and `Guest` – entities associated with a block.
- `TimeOfDayRange` – a Value Object that encapsulates start and end times with validation (no overlapping blocks allowed).
- `Studio` – an enum representing available studios.

### Responsibilities
- Contains validation logic (e.g., no overlapping blocks).
- Ensures all data manipulations maintain domain invariants.
- Free from database or framework dependencies.

---

## ⚙️ Scheduler.Application

The **Application layer** orchestrates use cases and defines DTOs and services.

### Example responsibilities
- Converting between domain entities and DTOs (`ScheduleBlockDto`, etc.)
- Coordinating logic for schedule manipulation.
- Previously included in-memory data seeding (`SevenDaysService`), now replaced by EF persistence.

This layer references `Scheduler.Domain` but not any infrastructure components.

---

## 💾 Scheduler.Infrastructure

The **Infrastructure layer** connects the domain model to persistence and external services.

### Key features
- **EF Core DbContext** configured for SQLite.
- Database migration management.
- Relationships defined between entities using the Fluent API.

### Example configuration

```csharp
modelBuilder.Entity<ScheduleBlock>()
    .HasMany(b => b.Presenters)
    .WithOne()
    .OnDelete(DeleteBehavior.Cascade);

modelBuilder.Entity<ScheduleBlock>()
    .HasMany(b => b.Guests)
    .WithOne()
    .OnDelete(DeleteBehavior.Cascade);
```

These cascade rules ensure that presenters and guests are automatically deleted when their block is removed.

---

## 🌐 Scheduler.Web

The **Web layer** exposes all functionality as a RESTful API built with ASP.NET Core.

### Highlights of Version 2
- ✅ Uses **SQLite** via EF Core instead of in-memory lists.
- ✅ Full CRUD persistence for `ScheduleBlocks`, `Presenters`, and `Guests`.
- ✅ Validations executed through domain logic (`TimeOfDayRange`).
- ✅ Cleanly separated layers with dependency injection.
- ✅ Fully documented with **OpenAPI/Scalar**.
- ✅ Tested using **Scalar** UI (all CRUD endpoints verified).

### API Endpoints

| Purpose               | Method | Route                                              |
| --------------------- | ------ | -------------------------------------------------- |
| Get all schedule data | GET    | `/api/schedule/all`                                |
| Get today’s schedule  | GET    | `/api/schedule/today`                              |
| Get upcoming week     | GET    | `/api/schedule/week`                               |
| Get block by id       | GET    | `/api/schedule/{id}`                               |
| Create block          | POST   | `/api/schedule/block`                              |
| Update block          | PUT    | `/api/schedule/block/{id}`                         |
| Delete block          | DELETE | `/api/schedule/block/{id}`                         |
| Add presenter         | POST   | `/api/schedule/block/{id}/presenter`               |
| Delete presenter      | DELETE | `/api/schedule/block/{id}/presenter/{presenterId}` |
| Add guest             | POST   | `/api/schedule/block/{id}/guest`                   |
| Delete guest          | DELETE | `/api/schedule/block/{id}/guest/{guestId}`         |

### Example Request

**POST /api/schedule/block**

```json
{
  "date": "2025-10-08",
  "startTime": "10:00",
  "endTime": "12:00",
  "title": "EF Test",
  "studio": "Studio1"
}
```

**Response (201 Created):**
```json
{
  "id": 5,
  "date": "2025-10-08",
  "startTime": "10:00",
  "endTime": "12:00",
  "title": "EF Test",
  "studio": "Studio1"
}
```

---

## 🧭 Scheduler.Cli

The **CLI project** was the initial implementation that ran purely in-memory.  
It demonstrated scheduling logic and validation before persistence was introduced.

### Original architecture goals
- Keep **Domain logic** independent from the presentation layer.
- Allow both CLI and Web to reuse the same core libraries.
- Explore modularization and Clean Architecture principles.

### Transition to Web API
The CLI app proved the business logic worked correctly.  
The same libraries were then referenced by `Scheduler.Web`, enabling data persistence and OpenAPI documentation without rewriting the core rules.

---

## 🧠 Design Reflection

Migrating from an in-memory prototype to a real database showed the strength of the Clean Architecture:
- Controllers remained simple and concise.
- Logic duplication was eliminated.
- Each layer could evolve independently.
- EF Core handled persistence transparently.
- The architecture is now ready for scaling or cloud deployment.

---

## 🧾 Technical Summary

| Technology | Purpose |
|-------------|----------|
| **.NET 9 (ASP.NET Core)** | Web API Framework |
| **Entity Framework Core 9** | ORM and SQLite provider |
| **SQLite** | Lightweight local database |
| **OpenAPI / Scalar** | API documentation and testing |
| **Dependency Injection** | Layer separation and lifetime control |
| **Clean Architecture** | Maintainable, testable design |

---

© 2025 Scheduler Project – Built for learning modularity, persistence, and clean design in .NET.
