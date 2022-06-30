import React from 'react';
import Card from 'react-bootstrap/Card';
import useBooks from '@/hooks/books.hook';

const BooksList: React.FC = () => {
  const { books } = useBooks();
  return (
    <div className="books-list">
      {books?.map((book) => (
        <Card key={book._id}>
          <Card.Img variant="top" src={book.images[2]?.url} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <div className="metadata">
              <h3>{book.author}</h3>
            </div>
          </Card.Body>
          <Card.Footer>
            <div>
              <h4>{book.publisher}</h4>
              <h6>{book.publish_year}</h6>
            </div>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default BooksList;
