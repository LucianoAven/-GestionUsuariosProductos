import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProductContext } from "../../context/ProductContext"; 
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const validationSchema = Yup.object({
  nombre: Yup.string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("El nombre es requerido"),

  precio: Yup.number()
    .typeError("El precio debe ser un número")
    .positive("El precio debe ser mayor que 0")
    .required("El precio es requerido"),
});


export default function ProductForm() {
  const { products, addProduct, editProduct } = useProductContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    nombre: "",
    precio: 0,
  });

  const toast = useRef(null);
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const product = products.find((p) => p.id === Number(id));
      if (product) {
        setInitialValues({
          nombre: product.nombre || "",
          precio: product.precio || 0,
        });
      }
    }
  }, [id, products, isEdit]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await editProduct(Number(id), values);
        toast.current?.show({
          severity: 'success',
          summary: 'Producto actualizado',
          detail: `Se actualizó "${values.nombre}"`,
          life: 1200
        });
      } else {
        await addProduct(values);
        toast.current?.show({
          severity: 'success',
          summary: 'Producto creado',
          detail: `Se creó "${values.nombre}"`,
          life: 1200
        });
      }

      setTimeout(() => {
        navigate('/productos', { replace: true });
      }, 900);      

    } catch (e) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: e?.message || 'No se pudo guardar el producto',
        life: 3000
      });
    } finally {
      setSubmitting?.(false)
    }
  };

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <Toast ref={toast} />

      <h2>{isEdit ? "Editar" : "Crear"} Producto</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

        {({ validateForm, submitForm, setTouched, isSubmitting }) => (

        <Form
          className="product-form"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div>
            <label>Nombre:</label>
            <Field
              name="nombre"
              className="p-inputtext p-component p-mb-3"
              placeholder="Nombre del producto"
            />
            <ErrorMessage
              name="nombre"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div>
            <label>Precio:</label>
            <Field
              name="precio"
              type="number"
              className="p-inputtext p-component p-mb-3"
              placeholder="Precio"
            />
            <ErrorMessage
              name="precio"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div className="p-d-flex p-gap-3">
            <Button
              type="button"
              label={isEdit ? "Actualizar" : "Crear"}
              className="p-button-success p-button-rounded"
              disabled={isSubmitting}
              onClick={async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length) {
                  // marca todo como "tocado" para que se muestren mensajes de validación
                  setTouched(
                    Object.keys(errors).reduce((acc, k) => ({ ...acc, [k]: true }), {}),
                    true
                  );
                  toast.current?.show({
                    severity: "error",
                    summary: "Datos inválidos",
                    detail: "Revisa los campos marcados en el formulario",
                    life: 2500,
                  });
                  return;
                }
                await submitForm();
              }}
            />              

            <Button
              label="Volver"
              className="p-button-secondary p-button-rounded"
              onClick={() => navigate("/productos")}
              type="button"
            />
          </div>
        </Form>
      )}
      </Formik>
    </div>
  );
}
