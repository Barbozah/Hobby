import React, { useState, useCallback, useEffect } from "react";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export default function Pagination(props) {
  
  const {
    totalRecords,
    pageLimit,
    pageNeighbours,
    onPageChanged
  } = props;

  const totalPages = Math.ceil(totalRecords / pageLimit);

  const [currentPage, setCurrentPage] = useState(1);

  const gotoPage = useCallback(page => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages)))
  }, [totalPages]);

  useEffect(() => {
    onPageChanged(currentPage)
  }, [onPageChanged, currentPage])

  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = evt => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = evt => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };
  
  const pages = fetchPageNumbers();
  
  return (
      <>
        <nav aria-label="Games Pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    {// eslint-disable-next-line
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={handleMoveLeft}
                    >
                      <span>&laquo;</span>
                    </a>}
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    {// eslint-disable-next-line
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={handleMoveRight}
                    >
                      <span>&raquo;</span>
                    </a>}
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? " active" : ""
                  }`}
                >
                  {// eslint-disable-next-line
                  <a
                    className="page-link"
                    href="#"
                    onClick={e => handleClick(page, e)}
                  >
                    {page}
                  </a>}
                </li>
              );
            })}
          </ul>
        </nav>
      </>
    );
}
