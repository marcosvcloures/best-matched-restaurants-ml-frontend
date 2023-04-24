import type { FilterValue, FilterDefinition } from 'types/Filter'
import React from 'react'

import './ActiveFiltersRow.css'

function ActiveFiltersRow ({ filters, removeFilter, availiableFilters }: {
  filters: FilterValue[]
  removeFilter: (filter: FilterValue) => void
  availiableFilters: FilterDefinition[] }): JSX.Element {
  if (filters.length === 0) {
    return <></>
  }

  function getDisplayName (filter: FilterValue): string {
    return availiableFilters.find(e => e.name === filter.name)?.displayName ?? ''
  }

  function getDisplayValue (filter: FilterValue): string | React.ReactElement {
    const filterDefinition = availiableFilters.find(e => e.name === filter.name)

    if (filterDefinition === undefined) {
      return ''
    }

    if (filterDefinition.formatComponent !== undefined) {
      return React.createElement(filterDefinition.formatComponent, { value: filter.value })
    }

    return filter.value as string
  }

  return <div className='flex flex-column row active-filter-row'>
    <span className='filter-row-title'>Applied filters</span>
    <div className='flex flex-row'>
      {filters.map(filter => (
        <span key={filter.name} className='filter'>
          {getDisplayName(filter)}: {getDisplayValue(filter)}
          <span className='fa fa-times close-button' onClick={evt => { removeFilter(filter); evt.preventDefault() }}></span>
        </span>
      ))}
    </div>
  </div>
}

export default ActiveFiltersRow
