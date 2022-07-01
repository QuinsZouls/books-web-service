import React from 'react';
import { render, screen } from '@testing-library/react';
import BooksPage from '../../pages/Books';

test('renders Books Page component', () => {
  render(<BooksPage />);
  const authorTitle = screen.getByText(/Authors/i);
  const yearsTitle = screen.getByText(/Published Years/i);
  expect(authorTitle).toBeInTheDocument();
  expect(yearsTitle).toBeInTheDocument();
});
