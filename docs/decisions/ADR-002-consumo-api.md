# ADR-002: API Consumption Strategy

- **Status:** Accepted
- **Date:** 2026-10-31
- **Decision makers:** Palinapau

---

## Context

The Ionic React application needs to communicate with the Express REST API to retrieve, create, update, and delete products. The application must handle network failures and unsuccessful HTTP responses consistently.

---

## Decision

Use the native JavaScript `fetch` API through the centralized client in `src/features/products/data/products-api.ts`.

- `API_URL` defines the base URL and reads the `VITE_API_URL` environment variable.
- The `request()` function centralizes HTTP requests.
- `ApiError` represents network errors and unsuccessful HTTP responses.
- API errors are translated into user-friendly messages using `getErrorMessage()` in the presentation layer.

---

## Alternatives considered

1. **Axios:** An external HTTP client library. Not selected because native `fetch` is sufficient.
2. **Direct fetch calls in each page:** Not selected because it duplicates request and error-handling logic.
3. **Centralized API client:** Selected because it improves consistency and maintainability.

---

## Consequences

- Centralized HTTP communication.
- Consistent error handling.
- Fewer duplicated requests and less code.
- The API base URL can be configured through environment variables.
- Network failures can be distinguished from HTTP errors.

---

## References

- `src/features/products/data/products-api.ts`
- `src/features/products/data/api-error.ts`
- `src/features/products/data/config.ts`
- `server/app.js`