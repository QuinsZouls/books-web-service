import { Query } from '@/interfaces/query.interface';

export function parseQueries(queries: Query[] = []): string {
  let query = '';
  for (let item of queries) {
    if (typeof item.value === 'undefined' || item.value === '') {
      continue;
    }
    query += `&${item.field}=${item.value}`;
  }
  return query;
}
