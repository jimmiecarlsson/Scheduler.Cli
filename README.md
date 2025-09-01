# Scheduler

A simple scheduling application built as a **Console App** to start with.  
The structure is modular so the same core logic can later be reused in a Web App.

## Project structure
```
Scheduler.Console/
  Program.cs
  Domain/        // business rules and models
  Application/   // use cases (e.g. BuildWeekSchedule)
  Infrastructure // simple adapters (e.g. music library)
```

## Design principles
- **Console** only handles input/output.  
- **Domain** contains all scheduling rules (no overlaps, 24h coverage, studio assignment).  
- **Application** orchestrates use cases (build week, fill gaps with music).  
- **Infrastructure** provides technical helpers (e.g. in-memory music list).  

## Flow (ASCII diagram)
```
[Console UI] → calls → [Application Use Case] → uses → [Domain Rules]
                                            ↘
                                             → [Infrastructure Adapters]
```

## Next step
When moving to a Web App, the Domain, Application, and Infrastructure folders can be lifted into separate class library projects.  
The logic stays the same — only the presentation layer changes (Console → Web).
