import React from 'react';
import BooksList from '@/components/Books/BooksList';
import Search from '@/components/Books/Search';
import SideMenu from '@/components/SideMenu';
//Providers
import { BooksProvider } from '@/hooks/books.hook';
import { AuthorsProvider } from '@/hooks/authors.hook';
import { PublishedYearsProvider } from '@/hooks/publishedYears.hook';
const BooksPage: React.FC = () => {
  return (
    <BooksProvider>
      <div className="books-page">
        <div className="menu-wrapper">
          <AuthorsProvider>
            <PublishedYearsProvider>
              <SideMenu />
            </PublishedYearsProvider>
          </AuthorsProvider>
        </div>
        <div className="container">
          <Search />
          <BooksList />
        </div>
      </div>
    </BooksProvider>
  );
};

export default BooksPage;
