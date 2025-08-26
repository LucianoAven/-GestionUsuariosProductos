import { Routes, Route } from 'react-router-dom';
import ProductsView from './ProductsView';
import ProductForm from './ProductForm';

import PrivateRoute from '../../utils/PrivateRoute';

export default function ProductRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductsView />} />      
      <Route path="/crear" element={
        <PrivateRoute>
          <ProductForm />
        </PrivateRoute>
        } />
      <Route path="/editar/:id" element={
        <PrivateRoute>
          <ProductForm />
        </PrivateRoute>
        } />
    </Routes>
  );
}
