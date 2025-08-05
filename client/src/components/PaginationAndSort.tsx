import { useSearchParams } from "react-router-dom";
import { HiOutlineSortDescending } from "react-icons/hi";
import { HiOutlineSortAscending } from "react-icons/hi";
function PaginationAndSort({ totalPages }: { totalPages: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSort = searchParams.get("sort") ?? null;

  //css in HomePage.ts
  function handleSort(sort: string) {
    if (currentSort === sort) return;
    //its always best to clone the searchParams
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", sort);
    setSearchParams(newParams); // ✅ This updates url
  }
  function handlePage(pageNumber: number) {
    if (currentPage === pageNumber) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(pageNumber));
    setSearchParams(newParams); // ✅ This updates url
  }
  return (
    <div className="pagination-container">
      <div className="sort-container">
        <button
          onClick={() => handleSort("descending")}
          className={currentSort === "descending" ? "active" : ""}
          disabled={currentSort === "descending"}
        >
          <HiOutlineSortDescending />
        </button>
        <button
          onClick={() => handleSort("ascending")}
          className={currentSort === "ascending" ? "active" : ""}
          disabled={currentSort === "ascending"}
        >
          <HiOutlineSortAscending />
        </button>
      </div>
      {totalPages > 1 && (
        <div className="page-container">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePage(i + 1)}
              disabled={i + 1 === currentPage}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default PaginationAndSort;
