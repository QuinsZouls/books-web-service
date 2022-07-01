import { Book } from '@/interfaces/books.interface';

export interface Response {
  data: any[] | Book[];
  total: number;
  skip: number;
  limit?: number;
}
