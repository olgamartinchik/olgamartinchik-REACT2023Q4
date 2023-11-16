import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import { setCurrentPage, setLimitPage } from '../../store';
import {
  COUNT_PAGE,
  DEFAULT_VISIBLE_PAGES,
  START_PAGE,
} from '../constants/countPage';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../store/store';
// import { setCurrentPage } from '../../store/pagination/pagination.slice';

export const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [currentPage, setCurrentPage] = useState(
  //   () => +(searchParams.get('offset') || 1)
  // );
  // const [limitPage, setLimitPage] = useState(
  //   () => +(searchParams.get('limit') || 20)
  // );
  // const { searchValue, countPages, loading, updatePokemon } =
  //   useContext(PokemonContext);

  const dispatch = useDispatch();

  const { currentPage, limitPage } = useAppSelector(
    (state) => state.pagination
  );

  // const { data, error, isLoading, isError, isSuccess } = useGetPokemonListQuery(
  //   {
  //     page: currentPage.toString(),
  //     limit: limitPage.toString(),
  //   }
  // );

  // useEffect(() => {
  //   if (data?.count === 1) {
  //     setCurrentPage(1);
  //   }
  // }, [countPages]);
  const offset = searchParams.get('offset');
  const limit = searchParams.get('limit');
  useEffect(() => {
    // const offset = searchParams.get('offset');
    // const limit = searchParams.get('limit');

    // if (limit && parseInt(limit) !== limitPage) {
    //   dispatch(setCurrentPage(START_PAGE)); //
    //   console.log('change url limit');
    // }
    dispatch(setLimitPage(+limit!));
    dispatch(setCurrentPage(+offset!));
  }, [offset, limit]);
  // useEffect(() => {
  //   dispatch(setCurrentPage(START_PAGE));
  // }, [limit]);

  useEffect(() => {
    setSearchParams({
      offset: currentPage.toString(),
      limit: limitPage.toString(),
    });
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
    // setCurrentPage(newPage);
    dispatch(setCurrentPage(newPage));
  };

  const handlerSetLimitPage = (e: ChangeEvent<HTMLSelectElement>) => {
    // setLimitPage(parseInt(e.target.value, 10));
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
