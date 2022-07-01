import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import InfiniteScroll from 'react-infinite-scroll-component';
//Hooks
import usePublishedYears from '@/hooks/publishedYears.hook';
import useBooks from '@/hooks/books.hook';

const YearsList: React.FC = () => {
  const {
    years,
    skip,
    updateSkip,
    total,
    updateQueries,
    queries,
    loading
  } = usePublishedYears();
  const books = useBooks();
  let timeout: ReturnType<typeof setTimeout>;
  function handleYearSearch(e: ChangeEvent<HTMLInputElement>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      updateQueries(
        queries.updateIn([0, 'value'], () => e.target?.value)
      );
    }, 500);
  }
  function handleYearSelect(value: any, author: string) {
    if (value) {
      books.updateQueries(
        books.queries.updateIn([3, 'value'], () => author)
      );
    } else {
      books.updateQueries(
        books.queries.updateIn([3, 'value'], () => '')
      );
    }
  }
  return (
    <div className="year-list">
      <div className="autor-search">
        <Form.Control
          placeholder="Search year"
          onChange={handleYearSearch}
        />
      </div>
      <Form>
        <div className="mb-3">
          {loading && <h6>Loading...</h6>}
          {years.length === 0 ? (
            <h6>No data</h6>
          ) : (
            <InfiniteScroll
              dataLength={years.length}
              hasMore={skip < total}
              loader={<h6>Loading...</h6>}
              next={() => updateSkip(skip + 20)}
              height={200}
            >
              {years.map((year, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleYearSelect(e.target.checked, year._id)
                  }
                  disabled={
                    books.queries.getIn([3, 'value']) !== '' &&
                    books.queries.getIn([3, 'value']) !== year._id
                  }
                  label={`${year._id} (${year.total})`}
                />
              ))}
            </InfiniteScroll>
          )}
        </div>
      </Form>
    </div>
  );
};

export default YearsList;
