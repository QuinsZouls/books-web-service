import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '../../components/Pagination';

test('renders Pagination component', () => {
  function onChange() {
    return;
  }
  render(
    <Pagination
      total={10000}
      limit={10}
      skip={0}
      onChange={onChange}
    />
  );
  const initialPage = screen.queryAllByText(/current/i)[0];
  const endPage = screen.queryAllByText(/1001/i)[0];
  expect(initialPage).toBeInTheDocument();
  expect(endPage).toBeInTheDocument();
});
