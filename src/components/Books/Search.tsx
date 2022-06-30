import React from 'react';
import Form from 'react-bootstrap/Form';
import Pagination from '../Pagination';
import useBooks from '@/hooks/books.hook';
const Search: React.FC = () => {
  const { total = 0, skip = 0, updateSkip } = useBooks();
  function handlePagination(current: number) {
    updateSkip(current * 10);
  }
  return (
    <div className="search-wrapper">
      <Form>
        <Form.Control placeholder="Search book..." />
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Pagination
          skip={skip}
          total={total}
          onChange={handlePagination}
          limit={10}
        />
      </div>
    </div>
  );
};
export default Search;
