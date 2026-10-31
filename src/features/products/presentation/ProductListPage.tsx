import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getErrorMessage } from '../data/api-error';
import { getProducts } from '../data/products-api';
import {
  CATEGORIES,
  filterProducts,
  toProductView,
} from '../domain/product';
import type { Product } from '../domain/product';
import EmptyState from './EmptyState';
import ProductCard from './ProductCard';

type LoadStatus = 'loading' | 'ready' | 'error';

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const isLoadingRef = useRef(false);
  const history = useHistory();

  const loadProducts = useCallback(async () => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setStatus('loading');

    try {
      setProducts(await getProducts());
      setStatus('ready');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setStatus('error');
    } finally {
      isLoadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  useIonViewWillEnter(() => {
    void loadProducts();
  });

  const filteredProducts = filterProducts(products, {
    search,
    category: selectedCategory,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonInput
          label="Buscar productos"
          labelPlacement="stacked"
          placeholder="Escribe el nombre..."
          value={search}
          onIonInput={(event) => setSearch(event.detail.value ?? '')}
        />

        <div className="ion-padding-vertical">
          <IonButton
            fill={selectedCategory === '' ? 'solid' : 'outline'}
            onClick={() => setSelectedCategory('')}
          >
            Todas
          </IonButton>

          {CATEGORIES.map((category) => (
            <IonButton
              key={category}
              fill={selectedCategory === category ? 'solid' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </IonButton>
          ))}
        </div>

        {status === 'loading' && (
          <p>Cargando productos…</p>
        )}

        {status === 'error' && (
          <EmptyState
            title="No se pudo cargar"
            message={errorMessage}
            actionLabel="Reintentar"
            onAction={() => void loadProducts()}
          />
        )}

        {status === 'ready' && products.length === 0 && (
          <EmptyState
            title="No hay productos"
            message="Todavía no se han registrado productos."
          />
        )}

        {status === 'ready' &&
          products.length > 0 &&
          filteredProducts.length === 0 && (
            <EmptyState
              title="Sin resultados"
              message="No encontramos productos con esos filtros."
            />
          )}

        {status === 'ready' && filteredProducts.length > 0 && (
          <IonList>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={toProductView(product)}
                onSelect={(id) => history.push(`/productos/${id}`)}
              />
            ))}
          </IonList>
        )}

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={() => history.push('/productos/nuevo')}
        >
          Nuevo producto
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProductListPage;