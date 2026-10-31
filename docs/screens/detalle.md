# Screen — Product Detail (Detalle de producto)

- **Route:** `/productos/:id`
- **Feature:** Productos
- **Design reference:** N/A (no mockup provided).

---

## Purpose

Allows users to view all the information associated with a registered product, navigate to its editing form, and delete it after confirmation.

---

## UI regions

| Region | Component | Notes |
|--------|-----------|-------|
| Header | IonHeader, IonToolbar, IonTitle | Displays the product detail title and back navigation. |
| Body | ProductDetailPage | Displays product name, ID, price, category, and stock. |
| Stock indicator | ProductView | Displays the stock availability label. |
| Actions | IonButton | Provides Edit and Delete actions. |
| Confirmation | In-screen confirmation | Requests confirmation before deleting the product. |

---

## States

| State | Trigger | UI |
|-------|---------|-----|
| Loading | Product request in progress | Loading indicator. |
| Loaded | Product successfully retrieved | All product fields and available actions. |
| Empty | Not applicable to an individual product | N/A. |
| Error | API request fails | Error message and appropriate navigation action. |
| Not found | API responds with HTTP 404 | Product not found message and return to list action. |
| Offline | API cannot be reached | Connection error message. |
| Deleting | Delete request in progress | Confirmation/action feedback. |

---

## Actions

| User action | Result | Use case / event |
|-------------|--------|------------------|
| Tap back | Returns to product list | Navigation |
| Tap Edit | Opens `/productos/:id/editar` | getProduct |
| Tap Delete | Requests deletion confirmation | DeleteProduct |
| Confirm deletion | Deletes the product and returns to the list | deleteProduct |
| Cancel deletion | Keeps the product unchanged | CancelDelete |

---

## Accessibility

- [ ] All interactive elements have accessible labels.
- [ ] Touch targets ≥ 44×44 pt / 48×48 dp.
- [ ] Text scales with OS font-size setting.
- [ ] Contrast meets WCAG AA.