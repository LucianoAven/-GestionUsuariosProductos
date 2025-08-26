import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserContext } from "../../context/UserContext"; 
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";

const validationSchema = Yup.object({
  rol: Yup.string()
    .required("El rol es requerido"),    
});

export default function UserFormRol() {
    const { users, editUser } = useUserContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({rol: "",});

    const [userName, setUserName] = useState("");

  const isEdit = Boolean(id);

  useEffect(() => {
    if (!isEdit) navigate("/usuarios");
  }, [isEdit, navigate]);  

  useEffect(() => {
    if (isEdit && users.length > 0) {
      const user = users.find((p) => p.id === Number(id));
      if (user) {
        setInitialValues({
          nombre: user.nombre || "",
          email: user.email,
          rol: user.rol || "",
          edad: user.edad,
        });
        setUserName(user.nombre || "");
      }
    }
  }, [isEdit, id, users]);

  const handleSubmit = async (values) => {
    await editUser(Number(id), { ...values});
    navigate("/usuarios/editAdmin");
  };


  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <h2>Editar rol del usuario {userName}</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form
          className="product-form"
          style={{ width: "100%", maxWidth: "400px" }}
        >

          <div>
            <label>Rol:</label>
            <Field
              name="rol"
              type="string"
              className="p-inputtext p-component p-mb-3"
              placeholder="Rol"
            />
            <ErrorMessage
              name="rol"
              component="div"
              className="p-text-danger"
            />
          </div>          

          <div
            className="p-d-flex"
            style={{ width: '100%', gap: '0.75rem' }}   // ocupa todo el ancho del form y agrega separación
          >
            <Button
              type="submit"
              label="Actualizar"
              className="p-button-success p-button-rounded"
              style={{ flex: 1 }}                       // cada botón toma 50% del ancho disponible
            />
            <Button
              type="button"
              label="Volver"
              className="p-button-secondary p-button-rounded"
              onClick={() => navigate("/usuarios")}
              style={{ flex: 1 }}                       
            />
          </div>

        </Form>
      </Formik>
    </div>
  );
}
