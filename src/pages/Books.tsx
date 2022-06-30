import React from 'react';
import BooksList from '@/components/Books/BooksList';
import Search from '@/components/Books/Search';
import { BooksProvider } from '@/hooks/books.hook';
const BooksPage: React.FC = () => {
  return (
    <BooksProvider>
      <div className="books-page">
        <div className="menu-wrapper"></div>
        <div className="container">
          <Search />
          <BooksList />
        </div>
      </div>
    </BooksProvider>
  );
};

export default BooksPage;
