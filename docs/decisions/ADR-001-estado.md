# ADR-001: Product State Management

- **Status:** Accepted
- **Date:** 2026-10-31
- **Decision makers:** Palinapau

---

## Context

The Ionic React application needs to manage product data, loading states, error messages, and form information. The application must keep the state predictable and update the interface when data changes.

---

## Decision

Use React `useState` and `useEffect` hooks to manage the state locally within each page.

- `useState` stores products, form values, loading status, and errors.
- `useEffect` loads product data when a page is initialized.
- `useIonViewWillEnter` refreshes the product list when returning to the page.

---

## Alternatives considered

1. **Global state management:** A centralized store such as Redux. Not necessary for the current application size.
2. **Context API:** Could share state across components but adds complexity.
3. **Local component state:** Selected because each screen manages its own state and requirements are simple.

---

## Consequences

- Simple implementation and easier maintenance.
- Each page manages its own state.
- Less architectural complexity.
- If the application grows, a centralized state management solution may become useful.

---

## References

- React documentation: useState and useEffect.
- Ionic React documentation.