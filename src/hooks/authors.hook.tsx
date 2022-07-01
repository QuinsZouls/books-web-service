import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext
} from 'react';
import { List } from 'immutable';
import { getAuthors } from '@/services/API.service';
import { Authors } from '@/interfaces/authors.interface';
import { Query } from '@/interfaces/query.interface';

export interface AuthorsProviderProps {
  children?: React.ReactNode;
}

interface AuthorsContextType {
  // Specify context interface
  authors: Authors[];
  total: number;
  skip: number;
  queries: List<Query>;
  loading: boolean;
  error?: any;
  updateQueries: (queries: List<Query>) => void;
  updateSkip: (skip: number) => void;
}

const AuthorsContext = createContext<AuthorsContextType>(
  {} as AuthorsContextType
);

export const AuthorsProvider: React.FC<AuthorsProviderProps> = ({
  children
}) => {
  const [authors, setAuthors] = useState<Authors[]>([]);
  const [queries, setQueries] = useState<List<Query>>(
    List([
      {
        field: '_id[$options]=i&_id[$regex]',
        value: ''
      }
    ])
  );
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getAuthors(queries.toArray(), skip, 20)
      .then(response => {
        if (response.ok) {
          setAuthors((res: Authors[]) => {
            if (response.data?.data) {
              return [...res, ...response.data?.data];
            } else {
              return res;
            }
          });
          if (response.data?.skip) {
            setSkip(response.data?.skip);
          }
          if (response.data?.total) {
            setTotal(response.data?.total);
          }
        }
        setLoading(false);
      })
      .catch(error => setError(error));
  }, [skip, queries]);
  function updateQueries(newQueries: List<Query>) {
    if (newQueries) {
      setAuthors([]);
      setSkip(0);
      setQueries(newQueries);
    }
  }
  function updateSkip(newSkip: number) {
    setSkip(newSkip);
  }
  const memoedValue = useMemo(
    () => ({
      authors,
      total,
      queries,
      skip,
      loading,
      error,
      updateQueries,
      updateSkip
    }),
    [authors, loading, error, skip, total, queries]
  );

  return (
    <AuthorsContext.Provider value={memoedValue}>
      {children}
    </AuthorsContext.Provider>
  );
};

export default function useAuthors() {
  return useContext(AuthorsContext);
}
