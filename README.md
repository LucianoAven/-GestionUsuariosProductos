# UsPro – Gestión de productos y usuarios

Aplicación full-stack para gestionar **productos** y **usuarios** con autenticación JWT, **protección de endpoints** y **control de roles** (admin / moderador / cliente).  
Frontend en **React + Vite + PrimeReact**. Backend en **Node.js + Express + Sequelize**.

---

## Características

**Backend**
- Login/Registro con JWT.
- Middleware `verifyToken` → solo acceden usuarios logueados.
- Middleware `isAdmin` → solo admins pueden crear/editar/eliminar productos y editar roles.
- Endpoints de **Productos** protegidos.
- Endpoints de **Usuarios** protegidos; edición de **rol** solo admin.

**Frontend**
- Rutas **públicas**: `/inicio-sesion`, `/registro`.
- Rutas **privadas**: `/productos/*`, `/usuarios/*`.
- Pantalla de **edición de rol** (solo admin): `/usuarios/editAdmin` y `/usuarios/editAdmin/:id`.
- Toasters de éxito/error.
- Badge con **Usuario / Rol** visible.


## Instalacion y ejecucion.

### Backend

- git clone https://github.com/LucianoAven/-GestionUsuariosProductos.git
- cd API-REST-DB
- npm install
- npm run dev       

#### Configuración de la base de datos

El proyecto utiliza Sequelize con la configuración en el archivo:

/config/config.json

- Ejemplo de configuración:

"development": { "username": "root", "password": "root1234", "database": "crud_db", "host": "127.0.0.1", "dialect": "mysql" }

Importante: debes cambiar estos datos con los de tu propio servidor MySQL:

    username → tu usuario de MySQL (por ejemplo "root")
    password → tu contraseña de MySQL
    database → el nombre de la base de datos (por ejemplo "crud_db")
    host → generalmente "127.0.0.1" o "localhost"

### Frontend

- cd FRONT-REACT
- npm install
- npm run dev

## Flujo de permisos

No logueado: Solo tiene acceso a "/", "/registro", "/inicio-sesion". Rutas privadas redirigen al login.

Logueado (rol ≠ admin): puede ver productos (GET). No puede crear/editar/eliminar (UI oculta + 403 del backend).

Admin: Puede hacer un CRUD de productos y cambiar rol de usuarios.

## Tecnologías

Backend: Node.js, Express, Sequelize, JWT, Nodemon.

Frontend: React (Vite), PrimeReact, PrimeIcons, Formik + Yup, React Router.

Otros: Axios, Toast/ConfirmDialog, util de exportación a PDF.
