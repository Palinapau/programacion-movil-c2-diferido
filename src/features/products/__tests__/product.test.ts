import { describe, expect, it } from 'vitest';
import seedProducts from '../../../../server/data/products.json';
import {
  CATEGORIES,
  formatCOP,
  LOW_STOCK_THRESHOLD,
  validateProduct,
  toProductView,
  filterProducts,
} from '../domain/product';

/**
 * Pruebas unitarias de EJEMPLO (ya vienen dadas) para que `npm test` corra desde el inicio.
 * Muestran el estilo esperado: describe / it / expect, sin red ni pantallas.
 */
describe('datos semilla de la API (ejemplo)', () => {
  it('trae 8 productos con ids 1 a 8', () => {
    expect(seedProducts).toHaveLength(8);
    expect(seedProducts.map((item) => item.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('usa solo categorías permitidas y stock entero no negativo', () => {
    for (const item of seedProducts) {
      expect(CATEGORIES).toContain(item.category);
      expect(Number.isInteger(item.stock)).toBe(true);
      expect(item.stock).toBeGreaterThanOrEqual(0);
    }
  });

  it('incluye productos agotados y con pocas unidades para probar las etiquetas', () => {
    expect(seedProducts.some((item) => item.stock === 0)).toBe(true);
    expect(seedProducts.some((item) => item.stock > 0 && item.stock < LOW_STOCK_THRESHOLD)).toBe(true);
  });
});

describe('formatCOP (ejemplo)', () => {
  it('separa los miles con punto y antepone el signo de pesos', () => {
    expect(formatCOP(1250000)).toBe('$ 1.250.000');
    expect(formatCOP(8500)).toBe('$ 8.500');
    expect(formatCOP(950)).toBe('$ 950');
  });
});

/**
 * TODO(Parte 5): agregue sus pruebas UNITARIAS aquí (o en archivos nuevos dentro de __tests__/).
 * Mínimo dos de estas funciones del dominio: `validateProduct`, `toProductView` o `filterProducts`.
 * Quite el `.todo` cuando escriba el cuerpo de cada una.
 */
describe('validateProduct', () => {
  it('rechaza un nombre vacío, un precio menor o igual que 0 y una categoría no permitida', () => {
    const result = validateProduct({
      name: '   ',
      price: 0,
      category: 'Tecnología',
      stock: 10,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.price).toBeDefined();
    expect(result.errors.category).toBeDefined();
  });
    const result = validateProduct({ name: '', price: 1000, category: 'Bebidas', stock: 10 });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBe('El nombre es obligatorio.');
  });

  it('rechaza un precio menor o igual que 0', () => {
    const result = validateProduct({ name: 'Producto de prueba', price: 0, category: 'Bebidas', stock: 10 });
    expect(result.isValid).toBe(false);
    expect(result.errors.price).toBe('El precio debe ser mayor que 0.');
  });

  it('rechaza una categoría no permitida', () => {
    const result = validateProduct({ name: 'Producto de prueba', price: 1000, category: 'Categoría no permitida', stock: 10 });
    expect(result.isValid).toBe(false);
    expect(result.errors.category).toBe('La categoría no es válida.');
  });

describe('toProductView', () => {
  it('formatea el precio en pesos y marca «Agotado» y «Pocas unidades', () => {
    const agotado = toProductView({
      id: 1,
      name: 'Galletas',
      price: 2700,
      category: 'Snacks',
      stock: 0,
    });

    const pocasUnidades = toProductView({
      id: 2,
      name: 'Gaseosa',
      price: 4800,
      category: 'Bebidas',
      stock: 4,
    });

    expect(agotado.priceLabel).toBe('$ 2.700');
    expect(agotado.stockLabel).toBe('Agotado');
    expect(agotado.isOutOfStock).toBe(true);

    expect(pocasUnidades.stockLabel).toBe('Pocas unidades');
    expect(pocasUnidades.isLowStock).toBe(true);
  });
});

describe('filterProducts', () => {
  it('filtra por texto sin distinguir mayúsculas y por categoría exacta', () => {
    const products = [
      { id: 1, name: 'Agua mineral', price: 1800, category: 'Bebidas', stock: 10 },
      { id: 2, name: 'Jugo de naranja', price: 5200, category: 'Bebidas', stock: 5 },
      { id: 3, name: 'Papas fritas', price: 3900, category: 'Snacks', stock: 20 },
    ];

    const result = filterProducts(products, {
      search: 'AGUA',
      category: 'Bebidas',
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Agua mineral');
  });
});
