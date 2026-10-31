import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getErrorMessage } from '../data/api-error';
import {
  createProduct,
  getProduct,
  updateProduct,
} from '../data/products-api';
import {
  CATEGORIES,
  validateProduct,
} from '../domain/product';
import type {
  ProductField,
  ProductInput,
  ValidationResult,
} from '../domain/product';

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditing = id !== undefined;
  const history = useHistory();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [errors, setErrors] = useState<ValidationResult['errors']>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    let active = true;

    const loadProduct = async () => {
      try {
        const product = await getProduct(Number(id));

        if (active) {
          setName(product.name);
          setPrice(String(product.price));
          setCategory(product.category);
          setStock(String(product.stock));
        }
      } catch (error) {
        if (active) setServerError(getErrorMessage(error));
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadProduct();

    return () => {
      active = false;
    };
  }, [id, isEditing]);

  const handleSave = async () => {
    const input: ProductInput = {
      name,
      price: Number(price),
      category,
      stock: Number(stock),
    };

    const validation = validateProduct(input);
    setErrors(validation.errors);
    setServerError('');

    if (!validation.isValid) return;

    try {
      setSaving(true);

      if (isEditing) {
        await updateProduct(Number(id), input);
      } else {
        await createProduct(input);
      }

      history.replace('/productos');
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const showError = (field: ProductField) => errors[field] ? (
    <p className="ion-padding-start" role="alert">
      {errors[field]}
    </p>
  ) : null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/productos" />
          </IonButtons>
          <IonTitle>{isEditing ? 'Editar producto' : 'Nuevo producto'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <p>Cargando producto...</p>
        ) : (
          <>
            <IonInput
              label="Nombre"
              labelPlacement="floating"
              fill="outline"
              value={name}
              onIonInput={(event) => setName(String(event.detail.value ?? ''))}
            />
            {showError('name')}

            <IonInput
              label="Precio"
              labelPlacement="floating"
              fill="outline"
              type="number"
              value={price}
              onIonInput={(event) => setPrice(String(event.detail.value ?? ''))}
            />
            {showError('price')}

            <p>Categoría</p>
            {CATEGORIES.map((item) => (
              <IonButton
                key={item}
                fill={category === item ? 'solid' : 'outline'}
                onClick={() => setCategory(item)}
              >
                {item}
              </IonButton>
            ))}
            {showError('category')}

            <IonInput
              label="Stock"
              labelPlacement="floating"
              fill="outline"
              type="number"
              value={stock}
              onIonInput={(event) => setStock(String(event.detail.value ?? ''))}
            />
            {showError('stock')}

            {serverError && (
              <p role="alert">{serverError}</p>
            )}

            <IonButton
              expand="block"
              className="ion-margin-top"
              disabled={saving}
              onClick={() => void handleSave()}
            >
              {saving ? 'Guardando...' : 'Guardar producto'}
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductFormPage;