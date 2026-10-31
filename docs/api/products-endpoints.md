# Product API — Endpoint Integration

- **Feature:** Product Catalog
- **Base URL:** `http://localhost:3000`
- **Protocol:** HTTP
- **Content-Type:** `application/json`

---

## 1. GET /api/products

**Purpose:** Retrieve the product catalog.

**Query parameters:**
- `search` (optional): Filter products by name, case-insensitive.
- `category` (optional): Filter by exact category.

**Success response:**
- `200 OK`: Returns an array of products.

**Error responses:**
- `404 Not Found`: Unknown route.
- `500 Internal Server Error`: Unexpected server error.

**App behavior:** Displays the product list, loading state, empty state, or error with retry.

---

## 2. GET /api/products/:id

**Purpose:** Retrieve a single product.

**Path parameters:**
- `id`: Numeric product identifier.

**Success response:**
- `200 OK`: Returns the requested product.

**Error responses:**
- `400 Bad Request`: Invalid product ID.
- `404 Not Found`: Product does not exist.
- `500 Internal Server Error`: Unexpected server error.

**App behavior:** Displays the product details or an appropriate error message.

---

## 3. POST /api/products

**Purpose:** Create a new product.

**Request body:**
- `name`: Required string, maximum 60 characters.
- `price`: Required number greater than 0.
- `category`: Required category: Bebidas, Snacks, Aseo, or Hogar.
- `stock`: Required integer greater than or equal to 0.

**Success response:**
- `201 Created`: Returns the created product with its assigned ID.

**Error responses:**
- `400 Bad Request`: Invalid product data. Returns `{ "error": "message", "details": [] }`.
- `500 Internal Server Error`: Unexpected server error.

**App behavior:** Validates the form, submits the product, displays errors when necessary, and returns to the product list after success.

---

## 4. PUT /api/products/:id

**Purpose:** Update an existing product.

**Path parameters:**
- `id`: Numeric product identifier.

**Request body:**
Same fields and validation rules as POST.

**Success response:**
- `200 OK`: Returns the updated product.

**Error responses:**
- `400 Bad Request`: Invalid ID or product data.
- `404 Not Found`: Product does not exist.
- `500 Internal Server Error`: Unexpected server error.

**App behavior:** Loads the existing product, validates changes, submits the update, and returns to the product list after success.

---

## 5. DELETE /api/products/:id

**Purpose:** Delete an existing product.

**Path parameters:**
- `id`: Numeric product identifier.

**Success response:**
- `204 No Content`: Product deleted successfully. No response body.

**Error responses:**
- `400 Bad Request`: Invalid product ID.
- `404 Not Found`: Product does not exist.
- `500 Internal Server Error`: Unexpected server error.

**App behavior:** Requests deletion confirmation, deletes the product, and returns to the product list after success.

---

## Common API error format

All API errors use the following JSON structure:

`{ "error": "Error message", "details": ["Validation detail"] }`

The application handles network errors separately from unsuccessful HTTP responses using `ApiError`.