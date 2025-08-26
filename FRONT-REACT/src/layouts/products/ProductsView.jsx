import { useProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useRef } from 'react';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   
import { Toast } from 'primereact/toast';

export default function ProductsView() {
  const { products, deleteProduct, loading, error } = useProductContext();
  const { user } = useContext(AuthContext)
  const isAdmin = user?.rol?.toLowerCase() === 'admin';

  const toast = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Si venimos del formulario con un mensaje, lo mostramos y limpiamos el state
  useEffect(() => {
    const msg = location.state?.toast;
    if (msg && toast.current) {
      toast.current.show({
        severity: msg.severity || 'success',
        summary: msg.summary,
        detail: msg.detail,
        life: msg.life ?? 3000
      });
      // limpiar el state para no repetir el toast al navegar atrás
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  const handleExport = () => {
    exportToPDF(products, 'Productos', ['nombre', 'precio']);
  };

  const onDelete = async (id, nombre) => {
    try {
      await deleteProduct(id);
      toast.current?.show({
        severity: 'success',
        summary: 'Producto eliminado',
        detail: `Se eliminó "${nombre}"`,
        life: 2500
      });
    } catch (e) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error al eliminar',
        detail: e?.message || 'No se pudo eliminar el producto',
        life: 3000
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />

      <h2><i className="pi pi-box" /> Lista de Productos <i className="pi pi-box" /></h2>

      {isAdmin && (
        <Link to="/productos/crear">
          <Button label="Crear nuevo producto" icon="pi pi-plus" className="p-button-rounded p-button-success" />
        </Link>
      )}

      <Link to="/">
        <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
      </Link>
      <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DataTable value={Array.isArray(products) ? products : []} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
        <Column field="nombre" header="Nombre" />
        <Column field="precio" header="Precio" />

        {isAdmin && ( 
          <Column 
            header="Acciones"
            headerStyle={{ textAlign: 'center' }}
            style={{ textAlign: 'center' }}
            body={(rowData) => (
              <>
                <Link to={`/productos/editar/${rowData.id}`}>
                  <Button label="Editar" icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" />
                </Link>
                <Button 
                  label="Eliminar" 
                  icon="pi pi-trash" 
                  className="p-button-rounded p-button-danger" 
                  onClick={() => onDelete(rowData.id, rowData.nombre)} 
                />
              </>
            )}
          />
        )}

      </DataTable>
    </div>
  );
}
