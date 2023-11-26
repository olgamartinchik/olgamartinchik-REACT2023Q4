import { ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Pagination.module.scss';
import { setCurrentPage, setLimitPage } from '../../store';
import {
  COUNT_PAGE,
  DEFAULT_VISIBLE_PAGES,
  START_PAGE,
} from '../../constants/countPage';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';

export const Pagination = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentPage, limitPage } = useAppSelector(
    (state) => state.pagination
  );

  const { query } = router;
  const offset = query.offset as string;
  const limit = query.limit as string;

  useEffect(() => {
    if (limit) {
      dispatch(setLimitPage(+limit));
    }
    if (offset) {
      dispatch(setCurrentPage(+offset));
    }
  }, [offset, limit]);

  useEffect(() => {
    const url = {
      pathname: router.pathname,
      query: {
        ...query,
        offset: currentPage.toString(),
        limit: limitPage.toString(),
      },
    };
    const newUrl = new URL(window.location.href);
    newUrl.search = new URLSearchParams(url.query).toString();
    window.history.replaceState({}, '', newUrl.href);
  }, [currentPage, limitPage]);

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
    <div className={styles.pagination}>
      {
        <select
          value={limitPage}
          onChange={(e) => handlerSetLimitPage(e)}
          aria-label="Select limit"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={60}>60</option>
        </select>
      }
      {
        <ul className={styles.pagination__list}>
          {currentPage > 1 && (
            <li
              className={`${styles.pagination__arrow} ${styles.pagination__arrow_left}`}
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
                  ? `${styles.pagination__item} ${styles.pagination__item_active}`
                  : `${styles.pagination__item}`
              }
              onClick={() => handlerSetCurrentPage(pageNumber)}
            >
              {pageNumber}
            </li>
          ))}
          {endPage < totalPages && <li>...</li>}

          {currentPage < totalPages && (
            <li
              className={`${styles.pagination__arrow} ${styles.pagination__arrow_right}`}
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
