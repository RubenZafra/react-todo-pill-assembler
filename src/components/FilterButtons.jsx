import { useEffect } from "react"

export const FilterButtons = ({showActive, showComplete, tasks, showAll, mode, deleteComplete}) => {

useEffect(() => {
  if (mode === 'All'){
    return showAll(tasks)
  } else if (mode === 'Active') {
    return showActive(tasks)
  } else if (mode === 'Complete'){
    return showComplete(tasks)
  }

}, [tasks])

  return (
    <ul className="filter-buttons-ul">
        <button 
            className="filter-li"
            onClick={()=>showAll(tasks)}
        >
            All
        </button>
        <button 
            className="filter-li"
            onClick={()=>showActive(tasks)}
        >
            Active
        </button>
        <button 
            className="filter-li"
            onClick={()=>showComplete(tasks)}
        >
            Completed
        </button>
        <button 
            className="filter-li clear-completed"
            onClick={()=>deleteComplete(tasks)}
        >
            Clear Completed!
        </button>
        
    </ul>
  )
}
