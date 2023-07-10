import '../../styles/pagination.css'

export default function Pagination({
  currentPage,
  pageCount,
  minPageLimit,
  maxPageLimit,
  paginate,
  onNextPage,
  onPreviousPage,
}) {
  const pageNumbers = []
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i)
  }

  let pageIncrementEllipses = null
  if (pageNumbers.length > maxPageLimit) {
    pageIncrementEllipses = (
      <li className="page-item" onClick={onNextPage}>
        <a className="page-link">&hellip;</a>
      </li>
    )
  }

  let pageDecrementEllipses = null
  if (minPageLimit >= 1) {
    pageDecrementEllipses = (
      <li className="page-item" onClick={onPreviousPage}>
        <a className="page-link">&hellip;</a>
      </li>
    )
  }

  return (
    <div>
      <nav aria-label="Pagination">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={currentPage > 1 ? onPreviousPage : null}
          >
            <a className="page-link">Précédent</a>
          </li>
          {pageDecrementEllipses}
          {pageNumbers.map((number) => {
            if (number <= maxPageLimit && number > minPageLimit) {
              return (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? 'active' : ''
                  }`}
                  onClick={() => paginate(number)}
                >
                  <a className="page-link">{number}</a>
                </li>
              )
            }
          })}
          {pageIncrementEllipses}
          <li
            className={`page-item ${
              currentPage === pageCount ? 'disabled' : ''
            }`}
            onClick={currentPage !== pageCount ? onNextPage : null}
          >
            <a className="page-link">Suivant</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
