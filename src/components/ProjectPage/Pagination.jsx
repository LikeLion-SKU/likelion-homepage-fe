import ReactPagination from 'react-js-pagination';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdFirstPage, MdLastPage } from 'react-icons/md';
import styles from './Pagination.module.css';

function Pagination({ currentPage0, totalElements = 0, pageSize = 6, onPageChange0 }) {
  const activePage = (currentPage0 ?? 0) + 1;

  if (!totalElements || totalElements <= pageSize) return null;

  return (
    <div className={styles.pagination}>
      <ReactPagination
        activePage={activePage}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalElements}
        pageRangeDisplayed={5}
        onChange={(page1Based) => onPageChange0(page1Based - 1)}
        prevPageText={<FiChevronLeft />}
        nextPageText={<FiChevronRight />}
        firstPageText={<MdFirstPage />}
        lastPageText={<MdLastPage />}
        innerClass={styles.paginationList}
        itemClass={styles.pageItem}
        linkClass={styles.pageLink}
        activeLinkClass={styles.activeLink}
      />
    </div>
  );
}

export default Pagination;
