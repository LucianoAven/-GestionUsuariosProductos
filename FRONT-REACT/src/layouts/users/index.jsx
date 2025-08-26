import { Routes, Route } from 'react-router-dom';
import UsersView from './UsersView';
import UserFormRol from './UserFormRol';
import UsersViewEdit from './UsersViewEdit';

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UsersView />} />
      <Route path='/editAdmin' element={<UsersViewEdit />} />
      <Route path="/editAdmin/:id" element={<UserFormRol />} />
    </Routes>
  );
}
