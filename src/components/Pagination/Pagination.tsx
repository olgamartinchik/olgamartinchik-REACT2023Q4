import { ChangeEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import { setCurrentPage, setLimitPage } from '../../store';
import {
  COUNT_PAGE,
  DEFAULT_VISIBLE_PAGES,
  START_LIMIT,
  START_PAGE,
} from '../constants/countPage';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/store';

export const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const { currentPage, limitPage } = useAppSelector(
    (state) => state.pagination
  );

  const offset = searchParams.get('offset');
  const limit = searchParams.get('limit');
  useEffect(() => {
    if (limit) {
      dispatch(setLimitPage(+limit));
    }
    if (offset) {
      dispatch(setCurrentPage(+offset));
    }
  }, [offset, limit]);

  useEffect(() => {
    setSearchParams({
      offset: currentPage.toString(),
      limit: limitPage.toString(),
    });
  }, [currentPage, limitPage, setSearchParams]);
  // useEffect(() => {
  //   dispatch(setLimitPage(+limit! || START_LIMIT));
  //   dispatch(setCurrentPage(+offset! || START_PAGE));
  // }, [offset, limit]);

  // useEffect(() => {
  //   setSearchParams({
  //     offset: currentPage.toString(),
  //     limit: limitPage.toString(),
  //   });
  // }, [currentPage, limitPage]);

  const generatePageNumbers = (start: number, end: number) => {
    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const totalPages = COUNT_PAGE || START_PAGE;
  const visiblePageRange = DEFAULT_VISIBLE_PAGES;
  const halfVisibleRange = Math.floor(visiblePageRange / 2);

  const startPage = Math.max(START_PAGE, currentPage - halfVisibleRange);
  const endPage = Math.min(totalPages, startPage + visiblePageRange - 1);

  const handlerSetCurrentPage = (newPage: number) => {
    // setCurrentPage(newPage);
    dispatch(setCurrentPage(newPage));
  };

  const handlerSetLimitPage = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimitPage(parseInt(e.target.value, 10)));
    dispatch(setCurrentPage(START_PAGE));
  };
  const handlerIncrement = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };
  const handlerDecrement = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  return (
    <div className="pagination">
      {
        <select value={limitPage} onChange={(e) => handlerSetLimitPage(e)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={60}>60</option>
        </select>
      }
      {
        <ul className="pagination__list">
          {currentPage > 1 && (
            <li
              className="pagination__arrow pagination__arrow_left"
              onClick={handlerDecrement}
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
              onClick={() => handlerSetCurrentPage(pageNumber)}
            >
              {pageNumber}
            </li>
          ))}
          {endPage < totalPages && <li>...</li>}

          {currentPage < totalPages && (
            <li
              className="pagination__arrow pagination__arrow_right "
              onClick={handlerIncrement}
            >
              ➡️
            </li>
          )}
        </ul>
      }
    </div>
  );
};
