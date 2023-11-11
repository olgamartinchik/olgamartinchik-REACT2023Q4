import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import { PokemonContext } from '../../context/PokemonContext';

export const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    () => +(searchParams.get('offset') || 1)
  );
  const [limitPage, setLimitPage] = useState(
    () => +(searchParams.get('limit') || 20)
  );
  const { countPages, loading, updatePokemon } = useContext(PokemonContext);

  useEffect(() => {
    if (countPages === 1) {
      setCurrentPage(1);
    }
  }, [countPages]);

  useEffect(() => {
    setSearchParams({
      offset: currentPage.toString(),
      limit: limitPage.toString(),
    });

    const value = localStorage.getItem('searchValue') || '';

    updatePokemon!(value, (currentPage * 2).toString(), limitPage.toString());
  }, [currentPage, limitPage]);

  const generatePageNumbers = (start: number, end: number) => {
    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const totalPages = countPages || 1;
  const visiblePageRange = 5;
  const halfVisibleRange = Math.floor(visiblePageRange / 2);

  const startPage = Math.max(1, currentPage - halfVisibleRange);
  const endPage = Math.min(totalPages, startPage + visiblePageRange - 1);

  const handleSetCurrentPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSetLimitPage = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimitPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="pagination">
      {!loading && (
        <select value={limitPage} onChange={(e) => handleSetLimitPage(e)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={60}>60</option>
        </select>
      )}
      {!loading && (
        <ul className="pagination__list">
          {currentPage > 1 && (
            <li
              className="pagination__arrow pagination__arrow_left"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ⬅️
            </li>
          )}

          {startPage > 1 && <li>...</li>}
          {generatePageNumbers(startPage, endPage).map((pageNumber) => (
            <li
              key={pageNumber}
              className={
                pageNumber === currentPage
                  ? 'pagination__item pagination__item_active'
                  : 'pagination__item'
              }
              onClick={() => handleSetCurrentPage(pageNumber)}
            >
              {pageNumber}
            </li>
          ))}
          {endPage < totalPages && <li>...</li>}

          {currentPage < totalPages && (
            <li
              className="pagination__arrow pagination__arrow_right "
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              ➡️
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
