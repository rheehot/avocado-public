/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import '../CSS/Wordbook.css';

function Pagination(props) {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  // ceil -> 반내림
  const pageCount = Math.ceil(itemsCount / pageSize);

  // page 2 를 넘어가지 않으면 표시하지 않음
  if (pageCount === 1) return null;

  // 1 부터 페이지 표시하기 위함
  const pages = _.range(1, pageCount + 1);

  return (
    <div className="pagination_wrap">
      <nav className="pagination_nav">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? 'page-item active' : 'page-item'
              }
              style={{ cursor: 'pointer' }}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// Pagination.propTypes = {
//   itemsCount: PropTypes.string.isRequired,
//   pageSize: PropTypes.string.isRequired,
//   currentPage: PropTypes.string.isRequired,
//   onPageChange: PropTypes.func.isRequired,
// };

export default Pagination;
