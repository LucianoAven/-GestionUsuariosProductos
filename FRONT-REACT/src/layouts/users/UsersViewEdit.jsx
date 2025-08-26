import { useUserContext } from '../../context/UserContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   

export default function UsersViewEdit() {
  const { users, deleteUser, loading, error } = useUserContext();

  const handleExport = () => {
    exportToPDF(users, 'Usuarios', ['nombre', 'email', 'edad', 'rol']);
  };

  return (
    <div>
      <h2> <i className="pi pi-users" /> Lista de Usuarios <i className="pi pi-users" /> </h2>
      <Link to="/">
        <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
      </Link>
      <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />

      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DataTable value={Array.isArray(users) ? users : []} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
        <Column field="nombre" header="Nombre" />
        <Column field="email" header="Email" />
        <Column field="rol" header="Rol" />
        <Column field="edad" header="Edad" />

        <Column 
          header="Acciones" 
          body={(rowData) => (
            <>
              <Link to={`${rowData.id}`}>
                <Button label="Editar Rol" icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" />
              </Link>
            </>
          )}
        />
      </DataTable>
    </div>
  );
}
