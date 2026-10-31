import { IonBadge, IonItem, IonLabel, IonNote } from '@ionic/react';
import type { ProductView } from '../domain/product';

export interface ProductCardProps {
  product: ProductView;
  onSelect?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => (
  <IonItem
    button
    detail
    onClick={() => onSelect?.(product.id)}
  >
    <IonLabel>
      <h2>{product.name}</h2>
      <p>{product.category}</p>
      <p>{product.priceLabel}</p>
      <IonNote>{product.stockLabel}</IonNote>
    </IonLabel>

    {(product.isLowStock || product.isOutOfStock) && (
      <IonBadge color="warning">
        {product.isOutOfStock ? 'Agotado' : 'Pocas unidades'}
      </IonBadge>
    )}
  </IonItem>
);

export default ProductCard;