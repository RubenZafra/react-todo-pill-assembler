export const FilterButtons = () => {
  return (
    <ul className="filter-buttons-ul">
        <button className="filter-li">
            All
        </button>
        <button className="filter-li">
            Active
        </button>
        <button className="filter-li">
            Completed
        </button>
        <button className="filter-li clear-completed">
            Clear Completed!
        </button>
        
    </ul>
  )
}
