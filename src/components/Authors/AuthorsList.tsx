import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import InfiniteScroll from 'react-infinite-scroll-component';
//Hooks
import useAuthors from '@/hooks/authors.hook';
import useBooks from '@/hooks/books.hook';

const AuthorsList: React.FC = () => {
  const {
    authors,
    skip,
    updateSkip,
    total,
    updateQueries,
    queries,
    loading
  } = useAuthors();
  const books = useBooks();
  let timeout: ReturnType<typeof setTimeout>;
  function handleAuthorSearch(e: ChangeEvent<HTMLInputElement>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      updateQueries(
        queries.updateIn([0, 'value'], () => e.target?.value)
      );
    }, 500);
  }
  function handleAuthorSelect(value: any, author: string) {
    if (value) {
      books.updateQueries(
        books.queries.updateIn([1, 'value'], () => author)
      );
    } else {
      books.updateQueries(
        books.queries.updateIn([1, 'value'], () => '')
      );
    }
  }
  return (
    <div className="autor-list">
      <div className="autor-search">
        <Form.Control
          placeholder="Search author"
          onChange={handleAuthorSearch}
        />
      </div>
      <Form>
        <div className="mb-3">
          {loading && <h6>Loading...</h6>}
          <InfiniteScroll
            dataLength={authors.length}
            hasMore={skip < total}
            loader={<h6>Loading...</h6>}
            next={() => updateSkip(skip + 20)}
            height={400}
          >
            {authors.map((author, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleAuthorSelect(e.target.checked, author._id)
                }
                disabled={
                  books.queries.getIn([1, 'value']) !== '' &&
                  books.queries.getIn([1, 'value']) !== author._id
                }
                label={`${author._id} (${author.total})`}
              />
            ))}
          </InfiniteScroll>
        </div>
      </Form>
    </div>
  );
};

export default AuthorsList;
