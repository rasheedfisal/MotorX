import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
