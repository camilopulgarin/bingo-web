// ProtectedRoute.js
import React from 'react';
import AuthGuard from '../components/AuthGuard';
import Layout from '../components/Layout';

const ProtectedRoute = ({ element }) => {
  return (
    <AuthGuard>
      <Layout>{element}</Layout>
    </AuthGuard>
  );
};

export default ProtectedRoute;
