import React from "react";

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return <li key={number} className="page-item">
            <a className="pagination-link" onClick={() => paginate(number)} href='#' >
                {number}
            </a>
          </li>;
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
