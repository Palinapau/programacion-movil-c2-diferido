# Screen — Product Form (Formulario de producto)

- **Route:** `/productos/nuevo` and `/productos/:id/editar`
- **Feature:** Productos
- **Design reference:** N/A (no mockup provided).

---

## Purpose

Allows users to create a new product or edit an existing product by entering its name, price, category, and stock. The form validates the information before submitting it to the API.

---

## UI regions

| Region | Component | Notes |
|--------|-----------|-------|
| Header | IonHeader, IonToolbar, IonTitle | Displays "Nuevo producto" or "Editar producto". |
| Navigation | IonBackButton | Returns to `/productos`. |
| Name | IonInput | Required text, maximum 60 characters. |
| Price | IonInput | Numeric value greater than 0. |
| Category | IonButton | Selection among Bebidas, Snacks, Aseo, and Hogar. |
| Stock | IonInput | Integer greater than or equal to 0. |
| Validation | Inline messages | Displays validation errors next to their respective fields. |
| Footer / CTA | IonButton | Saves the product. |

---

## States

| State | Trigger | UI |
|-------|---------|-----|
| Loading | Existing product is being retrieved for editing | Loading indicator. |
| Loaded | Form is ready | Editable fields with existing data or empty fields for creation. |
| Empty | Not applicable to the form | N/A. |
| Error | API request or submission fails | Error message and server validation details. |
| Invalid | Form validation fails | Inline error messages next to invalid fields. |
| Submitting | Create or update request in progress | Submission feedback and disabled save action. |
| Offline | API cannot be reached | Connection error message. |

---

## Actions

| User action | Result | Use case / event |
|-------------|--------|------------------|
| Enter product name | Updates the name field | ProductInput |
| Enter price | Updates the price field | ProductInput |
| Select category | Updates the category field | ProductInput |
| Enter stock | Updates the stock field | ProductInput |
| Tap Save | Validates all fields and submits valid data | validateProduct |
| Submit new product | Creates a product through the API | createProduct |
| Submit edited product | Updates an existing product through the API | updateProduct |
| Tap Back | Returns to the product list | Navigation |

---

## Accessibility

- [ ] All interactive elements have accessible labels.
- [ ] Touch targets ≥ 44×44 pt / 48×48 dp.
- [ ] Text scales with OS font-size setting.
- [ ] Contrast meets WCAG AA.