import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getErrorMessage } from '../data/api-error';
import { deleteProduct, getProduct } from '../data/products-api';
import { toProductView } from '../domain/product';
import type { ProductView } from '../domain/product';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [product, setProduct] = useState<ProductView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    let active = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(Number(id));

        if (active) {
          setProduct(toProductView(data));
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProduct(Number(id));
      history.replace('/productos');
    } catch (err) {
      setError(getErrorMessage(err));
      setConfirmDelete(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/productos" />
          </IonButtons>
          <IonTitle>Detalle del producto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading && <p>Cargando producto...</p>}

        {!loading && error && (
          <div>
            <p>{error}</p>
            <IonButton onClick={() => history.replace('/productos')}>
              Volver a productos
            </IonButton>
          </div>
        )}

        {!loading && !error && product && (
          <>
            <h2>{product.name}</h2>
            <p>Categoría: {product.category}</p>
            <h3>{product.priceLabel}</h3>
            <p>Stock: {product.stock}</p>
            <p>{product.stockLabel}</p>

            <IonButton
              expand="block"
              routerLink={`/productos/${id}/editar`}
            >
              Editar
            </IonButton>

            <IonButton
              expand="block"
              color="danger"
              onClick={() => setConfirmDelete(true)}
            >
              Eliminar
            </IonButton>

            {confirmDelete && (
              <div className="ion-padding">
                <p>¿Eliminar este producto?</p>

                <IonButton
                  color="danger"
                  expand="block"
                  onClick={() => void handleDelete()}
                >
                  Confirmar
                </IonButton>

                <IonButton
                  color="medium"
                  fill="outline"
                  expand="block"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancelar
                </IonButton>
              </div>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductDetailPage;