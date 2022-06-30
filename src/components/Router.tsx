import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Pages
import BooksPage from '@/pages/Books';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
