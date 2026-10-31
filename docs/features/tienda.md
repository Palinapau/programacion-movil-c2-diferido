# Feature — Product Catalog (Tienda)

- **Owner:** Palinapau
- **Status:** In progress
- **Related stories:** To be defined according to the assignment requirements.

---

## Purpose

The Product Catalog feature allows users to view and register products belonging to four categories: Papelería, Tecnología, Deportes, and Libros. It provides a simple way to manage the product catalog while enforcing the required product information and validation rules.

---

## Screens

| Screen | Route | Purpose |
|--------|-------|---------|
| Product List | `/productos` | Displays the registered products and provides access to the product registration form. |
| Product Form | To be confirmed from the application routing configuration. | Allows users to register a new product with the required information. |

Screen specifications:

- `../screens/lista.md`
- `../screens/formulario.md`

---

## State

- **Pattern:** To be confirmed from the starter architecture.
- **State object(s):** Product collection, loading status, error status, and product registration form state.
- **Key transitions:** Loading → Loaded → Empty / Error → Retry. Product registration: Idle → Submitting → Success / Error.

---

## Data

- **Use cases:** LoadProducts, CreateProduct.
- **Repositories:** ProductRepository.
- **Remote sources / endpoints:** Express REST API. Exact HTTP methods and paths will be documented in `../api/products-endpoints.md` after verifying the API contract.
- **Local persistence:** No local persistence requirement has been established in the assignment. Product data is managed through the REST API.

### Product validation rules

- The catalog must contain eight products created by the student.
- Product categories must be: Papelería, Tecnología, Deportes, and Libros.
- Product price must be an integer greater than or equal to 1000.
- Product stock must be an integer between 0 and 500.

---

## Edge cases & states

- [x] Loading: Display a loading state while products are being requested.
- [ ] Empty: Display an appropriate message when the catalog has no products.
- [x] Error / retry: Display an error message and allow the user to retry loading.
- [ ] Offline: Handle API connection failures appropriately.
- [x] Permission denied: Not applicable to the current catalog requirements.

---

## Decisions

- Product data is managed through an Express REST API.
- Product categories and validation rules follow the assignment requirements.
- See `../decisions/ADR-001-consumo-api.md` for the API consumption decision.

---

## Tests

- **Unit:** Product model validation, price validation, stock validation, and product repository behavior.
- **Widget/UI:** Product list rendering, empty state, loading state, error state, and product registration form.
- **Integration/E2E:** Product registration through the Ionic application and verification that the registered product appears in the catalog.