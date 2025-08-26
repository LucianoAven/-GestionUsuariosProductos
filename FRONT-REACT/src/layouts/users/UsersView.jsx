import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useUserContext } from '../../context/UserContext';

import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   

export default function UsersView() {
  const { users, deleteUser, loading, error } = useUserContext();

  const { user } = useContext(AuthContext)

  const isAdmin = user?.rol?.toLowerCase() === 'admin';

  const handleExport = () => {
    exportToPDF(users, 'Usuarios', ['nombre', 'email', 'edad', 'rol']);
  };

  return (
    <div>
      <h2>
        <i className="pi pi-users" /> Lista de Usuarios <i className="pi pi-users" />
      </h2>
      <Link to="/">
        <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
      </Link>

      {isAdmin ? (
        <>
          <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />

          <DataTable value={Array.isArray(users) ? users : []} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
            <Column field="nombre" header="Nombre" />
            <Column field="email" header="Email" />
            <Column field="rol" header="Rol" />
            <Column field="edad" header="Edad" />

          </DataTable>        
        </>
      ) : (
        <h2>Necesitas ser administrador para acceder a la lista de usuarios</h2>
      )}

      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
}
