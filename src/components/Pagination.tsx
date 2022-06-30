import React, { useState, useEffect } from 'react';
import PaginationBT from 'react-bootstrap/Pagination';

export interface PaginationProps {
  total: number;
  skip: number;
  limit: number;
  onChange: (skip: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  total = 0,
  skip = 0,
  limit = 10,
  onChange,
}) => {
  const [pages, setPages] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    const newPages = [];
    const parsedSkip = Math.floor(skip / limit);
    const parsedTotal = Math.floor(total / limit);
    if (total < limit) {
      if (parsedSkip < limit) {
        for (let index = 0; index < limit; index++) {
          newPages.push(
            <PaginationBT.Item
              active={parsedSkip === index}
              onClick={() => onChange(index)}
            >
              {index + 1}
            </PaginationBT.Item>
          );
        }
      } else {
        for (let index = skip; index < skip + limit; index++) {
          newPages.push(
            <PaginationBT.Item
              active={parsedSkip === index}
              onClick={() => onChange(index)}
            >
              {index + 1}
            </PaginationBT.Item>
          );
        }
      }
    } else {
      if (parsedSkip < 6) {
        for (let index = 0; index < limit; index++) {
          newPages.push(
            <PaginationBT.Item
              active={parsedSkip === index}
              onClick={() => onChange(index)}
            >
              {index + 1}
            </PaginationBT.Item>
          );
        }
        newPages.push(
          <PaginationBT.Item
            active={parsedSkip === parsedTotal}
            onClick={() => onChange(parsedTotal)}
          >
            {parsedTotal + 1}
          </PaginationBT.Item>
        );
      } else {
        newPages.push(
          <PaginationBT.Item active={skip === 0} onClick={() => onChange(0)}>
            1
          </PaginationBT.Item>
        );
        for (let index = skip - 40; index < skip + 50; index += limit) {
          if (index > total) {
            break;
          }
          newPages.push(
            <PaginationBT.Item
              active={skip === index}
              onClick={() => onChange(index / limit)}
            >
              {Math.floor(index / limit) + 1}
            </PaginationBT.Item>
          );
        }
        if (parsedSkip < parsedTotal) {
          newPages.push(
            <PaginationBT.Item
              active={parsedSkip === parsedTotal}
              onClick={() => onChange(parsedTotal)}
            >
              {parsedTotal + 1}
            </PaginationBT.Item>
          );
        }

      }
    }
    setPages(newPages);
  }, [total, skip, onChange, limit]);
  return <PaginationBT>{pages}</PaginationBT>;
};

export default Pagination;
