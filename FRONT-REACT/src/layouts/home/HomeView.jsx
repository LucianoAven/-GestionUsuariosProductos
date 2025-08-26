import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button'; 
import { AuthContext } from '../../context/AuthContext';
import { Toolbar } from 'primereact/toolbar';

import UserBadge from '../../components/UserBadge';

const HomeView = () => {
  const {user, logout} = useContext(AuthContext)

  const isAdmin = user?.rol?.toLowerCase() === 'admin';

  const leftContents = (
    <p className='brand-badge pi pi-bolt'>UsPro</p>
  );

  const rightContents = (
    user ? (
    <div className="flex gap-2">
      <Link to="/usuarios">
        <Button label="Ir a Usuarios" className='buttons' />
      </Link>

      <Link to="/productos">
        <Button label="Ir a Productos" className='buttons' />
      </Link>

      {isAdmin && ( 
        <Link to="usuarios/editAdmin">
          <Button label='Editar Rol' className='buttons' />
        </Link>
      )}

      <Button label='Cerrar Sesión' onClick={logout} className='buttons' />
    </div>
    ) : (
    <div className="flex gap-2">
      <Link to="/registro">
        <Button label="Registro" icon="pi pi-user-plus" className='buttons' />
      </Link>
      <Link to="/inicio-sesion">
        <Button label="Iniciar Sesión" icon="pi pi-sign-in" className='buttons' />
      </Link>        
    </div>
    )
    );

  return (

    <div style={{ textAlign: 'center' }}>

      <div className='navbar-container' style={{ textAlign: 'center', padding: '0 20px 270px' }}>
        <Toolbar className='navbar' left={leftContents} right={rightContents} style={{ backgroundColor: '#262731ff', color: '#fff'}} />

        <div className="user-badge-row">
          <UserBadge />
        </div>        

        <div className="page-content">
          <h1 className='text'>Bienvenido a <b>UsPro</b></h1>
          <h2 className='text'>Aplicacion para la gestion de productos y usuarios</h2>
          <h3 className='text'>Realizada con React y NodeJS-Express</h3>        
        </div>
      </div>

    </div>
  );
};

export default HomeView;

