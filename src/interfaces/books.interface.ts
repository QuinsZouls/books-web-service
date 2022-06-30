import { Image } from './image.interface';
export interface Book {
  _id: string;
  code: string;
  title: string;
  author: string;
  publish_year: number;
  publisher: string;
  images: Image[];
}
