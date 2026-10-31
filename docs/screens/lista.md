# Screen — Product List (Lista de productos)

- **Route:** `/productos`
- **Feature:** Productos
- **Design reference:** N/A (no mockup provided).

---

## Purpose

Allows users to browse the registered products, search by name, filter by category, view product details, and navigate to the product creation form.

---

## UI regions

| Region | Component | Notes |
|--------|-----------|-------|
| Header | IonHeader, IonToolbar, IonTitle | Displays the title "Productos". |
| Search | IonInput | Searches products by name. |
| Category filter | IonButton | Includes "Todas", "Bebidas", "Snacks", "Aseo", and "Hogar". |
| Body | ProductCard, IonList | Displays products with name, category, price, and stock status. |
| Empty state | EmptyState | Displays a message when no products exist or filters return no results. |
| Footer / CTA | IonButton | Navigates to `/productos/nuevo`. |

---

## States

| State | Trigger | UI |
|-------|---------|-----|
| Loading | Product request in progress | Loading message or indicator. |
| Loaded | Products successfully retrieved | Product list with search and category filters. |
| Empty | API returns an empty product list | EmptyState with an appropriate message. |
| No results | Search or category filters match no products | EmptyState explaining that no products match the filters. |
| Error | API request fails | Error message and "Reintentar" action. |
| Offline | API cannot be reached | Connection error message and retry action. |

---

## Actions

| User action | Result | Use case / event |
|-------------|--------|------------------|
| Enter search text | Filters products by name | filterProducts |
| Select a category | Filters products by exact category | filterProducts |
| Tap a product | Opens `/productos/:id` | getProduct |
| Tap "Nuevo producto" | Opens `/productos/nuevo` | CreateProduct |
| Tap "Reintentar" | Requests products again | LoadProducts |

---

## Accessibility

- [ ] All interactive elements have accessible labels.
- [ ] Touch targets ≥ 44×44 pt / 48×48 dp.
- [ ] Text scales with OS font-size setting.
- [ ] Contrast meets WCAG AA.