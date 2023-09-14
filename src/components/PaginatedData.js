import { useState, useEffect } from 'react'
import Card from './common/Card'
import Pagination from './common/Pagination'

export default function PaginatedData({ data, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentData, setCurrentData] = useState([])

  const [maxPageLimit, setMaxPageLimit] = useState(2)
  const [minPageLimit, setMinPageLimit] = useState(0)
  const pageNumberLimit = 2

  const resetState = () => {
    setCurrentPage(1)
    setMinPageLimit(0)
    setMaxPageLimit(2)
  }

  useEffect(() => {
    resetState()
  }, [data])

  useEffect(() => {
    const firstIndex = (currentPage - 1) * itemsPerPage
    const lastIndex = firstIndex + itemsPerPage
    setCurrentData(data.slice(firstIndex, lastIndex))
  }, [data, currentPage])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const nextPage = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit)
      setMinPageLimit(minPageLimit + pageNumberLimit)
    }
    setCurrentPage((prev) => prev + 1)
  }

  const previousPage = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit)
      setMinPageLimit(minPageLimit - pageNumberLimit)
    }
    setCurrentPage((prev) => prev - 1)
  }

  return (
    <div className="row">
      {currentData &&
        currentData.map((recipe) => (
          <div className="col-xs-12 col-sm-6 col-lg-4 p-4" key={recipe.id}>
            <Card recipe={recipe} />
          </div>
        ))}

      <Pagination
        currentPage={currentPage}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        minPageLimit={minPageLimit}
        maxPageLimit={maxPageLimit}
        paginate={paginate}
        onNextPage={nextPage}
        onPreviousPage={previousPage}
      />
    </div>
  )
}
