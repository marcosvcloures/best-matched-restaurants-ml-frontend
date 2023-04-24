import React, { useState } from 'react'
import type { FilterDefinition, FilterValue } from 'types/Filter'
import AddFilterTooltip from './addFilterTooltip/AddFilterTooltip'

function AddFilterRow ({ filters, addFilter, availiableFilters }: {
  filters: FilterValue[]
  addFilter: (filter: FilterValue) => void
  availiableFilters: FilterDefinition[]
}): JSX.Element {
  const [currentFilter, setCurrentFilter] = useState(undefined as FilterDefinition | undefined)

  if (filters.length === availiableFilters.length) {
    return <></>
  }

  return <div className='flex flex-column relative add-filter-row'>
    <span className='filter-row-title'>Filter by</span>

    <div>
      {availiableFilters
        .filter(availiableFilter => !filters.some(filter => filter.name === availiableFilter.name))
        .map(filter => <div className='relative inline-block' key={filter.name}>
          <span
            className='filter'
            onClick={evt => { setCurrentFilter(filter); evt.preventDefault() }}>
            {filter.displayName}
          </span>

          { currentFilter === filter && <AddFilterTooltip currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} addFilter={addFilter} /> }
        </div>)}
    </div>
  </div>
}

export default AddFilterRow
