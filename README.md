# Playwright + TypeScript Enterprise Test Automation Framework

A scalable, hybrid **UI + API + CI/CD** test automation framework built with **Playwright** and **TypeScript**, demonstrating modern SDET engineering practices.

## Key Architecture & Features
- **Page Object Model (POM):** Decoupled UI locators and business actions (`src/pages/`) for maintainable E2E flows.
- **API Client & Contract Validation:** Encapsulated REST API service layer (`src/api/clients/`) paired with **Zod** schemas (`src/api/schemas/`) for strict runtime JSON payload validation.
- **Custom Fixtures:** Dependency injection via Playwright `test.extend` (`src/fixtures/base.fixture.ts`) eliminating test setup boilerplate.
- **Dynamic Test Data:** Randomized test data generation using `@faker-js/faker` to prevent data collisions.
- **CI/CD Pipeline:** Automated execution on GitHub Actions (`.github/workflows/playwright.yml`) with HTML test report artifacts uploaded on every run.

## Project Structure
```text
├── .github/workflows/playwright.yml   # GitHub Actions CI/CD workflow
├── src/
│   ├── api/
│   │   ├── clients/                   # Encapsulated REST API clients
│   │   └── schemas/                   # Zod runtime JSON contract schemas
│   ├── fixtures/                      # Custom Playwright dependency-injection fixtures
│   └── pages/                         # Page Object Model classes
├── tests/
│   ├── api/                           # API CRUD & schema validation specs
│   └── ui/                            # UI end-to-end & negative specs
├── playwright.config.ts               # Multi-project test runner configuration
└── tsconfig.json                      # Strict TypeScript compiler & path alias setup