import { Book } from '@/interfaces/books.interface';

export interface Query {
  field: string;
  value: string | number | Date;
  operator?: string;
}
export interface Response {
  data: any[] | Book[];
  total: number;
  skip: number;
  limit?: number;
}
