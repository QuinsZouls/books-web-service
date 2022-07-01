import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext
} from 'react';
import { List } from 'immutable';
import { getPublishedYears } from '@/services/API.service';
import { Authors } from '@/interfaces/authors.interface';
import { Query } from '@/interfaces/query.interface';

export interface PublishedYearsProviderProps {
  children?: React.ReactNode;
}

interface PublishedYearsContextType {
  // Specify context interface
  years: Authors[];
  total: number;
  skip: number;
  queries: List<Query>;
  loading: boolean;
  error?: any;
  updateQueries: (queries: List<Query>) => void;
  updateSkip: (skip: number) => void;
}

const PublishedYearsContext =
  createContext<PublishedYearsContextType>(
    {} as PublishedYearsContextType
  );

export const PublishedYearsProvider: React.FC<
  PublishedYearsProviderProps
> = ({ children }) => {
  const [years, setYears] = useState<Authors[]>([]);
  const [queries, setQueries] = useState<List<Query>>(
    List([
      {
        field: '_id',
        value: ''
      }
    ])
  );
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getPublishedYears(queries.toArray(), skip, 20)
      .then(response => {
        if (response.ok) {
          setYears((res: Authors[]) => {
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
      setYears([]);
      setSkip(0);
      setQueries(newQueries);
    }
  }
  function updateSkip(newSkip: number) {
    setSkip(newSkip);
  }
  const memoedValue = useMemo(
    () => ({
      years,
      total,
      queries,
      skip,
      loading,
      error,
      updateQueries,
      updateSkip
    }),
    [years, loading, error, skip, total, queries]
  );

  return (
    <PublishedYearsContext.Provider value={memoedValue}>
      {children}
    </PublishedYearsContext.Provider>
  );
};

export default function usePublishedYears() {
  return useContext(PublishedYearsContext);
}
