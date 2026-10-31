# Feature — Product Catalog

- **Owner:** Palinapau
- **Status:** In progress
- **Related stories:** Product listing, product details, product creation, product editing and deletion.

---

## Purpose

The Product Catalog feature allows users to view and manage products belonging to four categories: Bebidas, Snacks, Aseo, and Hogar. Users can search products by name, filter them by category, view product details, create new products, edit existing products, and delete products. The feature validates product information before sending requests to the API.

---

## Screens

| Screen | Route | Purpose |
|--------|-------|---------|
| Product List | `/productos` | Displays products with search and category filters. |
| Product Detail | `/productos/:id` | Displays product information and provides edit and delete actions. |
| Product Creation Form | `/productos/nuevo` | Allows users to register a new product. |
| Product Editing Form | `/productos/:id/editar` | Allows users to update an existing product. |

Screen specifications:

- `../screens/lista.md`
- `../screens/detalle.md`
- `../screens/formulario.md`

---

## State

- **Pattern:** Local React state using `useState` and `useEffect`.
- **State objects:** Product collection, loading status, error messages, search text, selected category, product details, form values and validation errors.
- **Key transitions:** Loading → Ready → Empty / No results / Error → Retry.
- **Form transitions:** Idle → Submitting → Success / Error.

Each screen manages its own presentation state. Product data is retrieved and modified through the REST API.

---

## Data

- **Use cases:** GetProducts, GetProduct, CreateProduct, UpdateProduct, DeleteProduct, FilterProducts and ValidateProduct.
- **Data access:** HTTP client implemented in `products-api.ts`.
- **Remote source:** Express REST API.
- **Local persistence:** No local persistence is required. Product data is stored in server memory and resets when the server restarts.

### Product validation rules

- Product name is required and cannot exceed 60 characters.
- Product price must be a number greater than 0.
- Product category must be one of: Bebidas, Snacks, Aseo or Hogar.
- Product stock must be an integer greater than or equal to 0.
- Product IDs are assigned automatically by the API.

---

## Edge cases & states

- [x] Loading: Display a loading message while products are being requested.
- [x] Empty: Display a message when the API returns no products.
- [x] No results: Display a message when the selected filters return no products.
- [x] Error / retry: Display an error message and allow retrying the request.
- [x] Offline: Network failures are handled through ApiError and displayed in the presentation layer.
- [x] Invalid input: Display validation errors for product fields.
- [x] Not found: Handle requests for products that do not exist.

---

## Decisions

- Product data is managed through an Express REST API.
- Presentation state is managed locally with React hooks.
- The application follows the data, domain and presentation layers.
- See `../decisions/ADR-001-estado.md` for the state management decision.
- See `../decisions/ADR-002-consumo-api.md` for the API consumption decision.

---

## Tests

- **Unit:** Product validation, product view transformation, product filtering and price formatting.
- **API integration:** Invalid product creation returns HTTP 400; requesting a nonexistent product returns HTTP 404.
- **UI:** Product list, loading, empty, error, product details and product form states.
- **Manual verification:** CRUD operations and filtering through the running application.

