import { create, ApiResponse } from 'apisauce';
import { parseQueries } from '@/utils/query';
import { Query } from '@/interfaces/query.interface';
import { Response } from '@/interfaces/services.interface';
const API = create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getBooks = async (
  queries: Query[] = [],
  skip = 0,
  limit = 10
): Promise<ApiResponse<Response>> =>
  await API.get(
    `/books?$skip=${skip}&$limit=${limit}${parseQueries(queries)}`
  );

export const getAuthors = async (
  queries: Query[] = [],
  skip = 0,
  limit = 10
): Promise<ApiResponse<Response>> =>
  await API.get(
    `/authors?$skip=${skip}&$limit=${limit}${parseQueries(queries)}`
  );

export const getPublishedYears = async (
  queries: Query[] = [],
  skip = 0,
  limit = 10
): Promise<ApiResponse<Response>> =>
  await API.get(
    `/publish-year?$skip=${skip}&$limit=${limit}${parseQueries(
      queries
    )}`
  );
