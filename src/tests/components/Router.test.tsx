import React from 'react';
import { render, screen } from '@testing-library/react';
import Router from '../../components/Router';

test('renders Router component', () => {
  render(<Router />);
  const linkElement = screen.getByText(/Authors/i);
  expect(linkElement).toBeInTheDocument();
});
