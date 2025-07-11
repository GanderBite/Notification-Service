# How I test

Rather than aiming for 100% code coverage, my focus is on demonstrating a clear and practical testing approach — one that reflects how I write reliable, maintainable, and meaningful tests in real-world projects.

For this project, I’ve used an in-memory database as a substitute for a real test database instance to keep tests fast, isolated, and deterministic.

### 1. Unit Tests for Domain Entities

I begin by testing the core domain logic in isolation. These unit tests ensure that entities behave as expected, including handling of edge cases and invalid inputs.

### 2. Integration Tests for Use Cases

Next, I test the business use cases that coordinate multiple components (like repositories and services). These integration tests verify that the application's logic flows work end-to-end.

### 3. Integration Tests for Routes

Finally, I test the HTTP routes themselves — making real requests against the Express app to ensure correct status codes, payloads, and error handling are returned to clients.
