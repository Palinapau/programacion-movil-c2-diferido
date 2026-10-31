# Product Entity — Data Model

- **Entity:** Product
- **Feature:** Product Catalog
- **Storage:** In-memory (Express API)

---

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| id | number | Yes | Unique incremental product identifier. |
| name | string | Yes | Product name, maximum 60 characters, cannot be empty. |
| price | number | Yes | Product price, must be greater than 0. |
| category | string | Yes | Must be one of the allowed categories. |
| stock | number | Yes | Integer greater than or equal to 0. |

---

## Allowed categories

- Bebidas
- Snacks
- Aseo
- Hogar

---

## Validation rules

- Product name cannot be empty or contain only whitespace.
- Product name cannot exceed 60 characters.
- Product price must be a number greater than 0.
- Product category must belong to the allowed categories.
- Product stock must be an integer greater than or equal to 0.
- Product ID is assigned incrementally by the API.

---

## Persistence

**Storage:** N/A (in-memory storage).

**Database:** N/A (in-memory storage).

**Indexes:** N/A (in-memory storage).

**Synchronization:** N/A (in-memory storage).

**Offline support:** N/A (no local persistence requirement).

---

## Relationships

No relationships with other entities are required.

---

## References

- `server/app.js`
- `server/data/products.json`
- `src/features/products/domain/product.ts`
- `docs/api/products-endpoints.md`