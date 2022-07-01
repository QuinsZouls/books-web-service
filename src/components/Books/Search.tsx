import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Pagination from '../Pagination';
//Hooks
import useBooks from '@/hooks/books.hook';

const Search: React.FC = () => {
  const {
    total = 0,
    skip = 0,
    updateSkip,
    queries,
    updateQueries
  } = useBooks();
  let timeout: ReturnType<typeof setTimeout>;

  function handlePagination(current: number) {
    updateSkip(current * 10);
  }
  function handleBookSearch(e: ChangeEvent<HTMLInputElement>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      updateQueries(
        queries.updateIn([0, 'value'], () => e.target?.value)
      );
    }, 500);
  }
  function handlePublisherSearch(e: ChangeEvent<HTMLInputElement>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      updateQueries(
        queries.updateIn([2, 'value'], () => e.target?.value)
      );
    }, 500);
  }
  return (
    <div className="search-wrapper">
      <Form>
        <Form.Control
          placeholder="Search title..."
          onChange={handleBookSearch}
        />
        <Form.Control
          placeholder="Search publisher"
          onChange={handlePublisherSearch}
        />
      </Form>
      <div className="pagination-wrapper">
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
