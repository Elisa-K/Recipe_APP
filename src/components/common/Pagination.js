export default function Pagination({ currentPage, pageCount, onNextPage, onPreviousPage }) {
    return (
        <div>
            <button disabled={currentPage === 1} onClick={onPreviousPage}>
                Précédent
            </button>
            <button disabled={currentPage === pageCount} onClick={onNextPage}>
                Suivant
            </button>
        </div>
    )
}