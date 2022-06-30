import { create, ApiResponse } from 'apisauce';
import { parseQueries } from '@/utils/query';
import { Query } from '@/interfaces/query.interface';
import { Response } from '@/interfaces/services.interface';
const API = create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getBooks = async (
  queries: Query[] = [],
  skip: number = 0,
  limit: number = 10
): Promise<ApiResponse<Response>> =>
  await API.get(`/books?$skip=${skip}&$limit=${limit}${parseQueries(queries)}`);
