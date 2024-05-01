```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    note right of browser: Browser sends a .json note with content and date
    server-->>browser: Responds with 201 Created status
```
