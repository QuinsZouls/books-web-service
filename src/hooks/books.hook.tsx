import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { getBooks } from '@/services/API.service';
import { Book } from '@/interfaces/books.interface';
import { Query } from '@/interfaces/query.interface';

export interface BooksProviderProps {
  children?: React.ReactNode;
}

interface BooksContextType {
  // Specify context interface
  books?: Book[];
  total: number | undefined;
  skip: number | undefined;
  queries?: Query[];
  loading: boolean;
  error?: any;
  updateQueries: (queries: Query[]) => void;
  updateSkip: (skip: number) => void;
}

const BooksContext = createContext<BooksContextType>({} as BooksContextType);

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[] | any>(null);
  const [queries, setQueries] = useState<Query[]>([]);
  const [total, setTotal] = useState<number | undefined>(0);
  const [skip, setSkip] = useState<number | undefined>(0);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getBooks(queries, skip)
      .then((response) => {
        if (response.ok) {
          setBooks(response.data?.data);
          setSkip(response.data?.skip);
          setTotal(response.data?.total);
        }
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, [queries, skip]);
  function updateQueries(newQueries: Query[]) {
    setQueries(newQueries);
  }
  function updateSkip(newSkip: number) {
    setSkip(newSkip);
  }
  const memoedValue = useMemo(
    () => ({
      books,
      total,
      skip,
      loading,
      error,
      updateQueries,
      updateSkip,
    }),
    [books, loading, error, skip, total]
  );

  return (
    <BooksContext.Provider value={memoedValue}>
      {children}
    </BooksContext.Provider>
  );
};

export default function useBooks() {
  return useContext(BooksContext);
}
