import { Query } from '@/interfaces/query.interface';

/**
 *
 * @param queries Array of Query
 * @description Parse an array of queries to a inline HTTP queries
 * @returns a queries stringifies
 */
export function parseQueries(queries: Query[] = []): string {
  let query = '';
  for (const item of queries) {
    if (typeof item.value === 'undefined' || item.value === '') {
      continue;
    }
    query += `&${item.field}=${item.value}`;
  }
  return query;
}
