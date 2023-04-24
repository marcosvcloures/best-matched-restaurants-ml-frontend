import type { FilterValue, FilterDefinition } from 'types/Filter'
import { AvailiableFilters } from 'data/AvailiableFilters'
import React, { useEffect, useState } from 'react'

import './FilterHeader.css'
import AddFilterRow from './addFilterRow/AddFilterRow'
import ActiveFiltersRow from './activeFiltersRow/ActiveFiltersRow'

function FilterHeader ({ filters, addFilter, removeFilter }: { filters: FilterValue[], addFilter: (value: FilterValue) => void, removeFilter: (value: FilterValue) => void }): JSX.Element {
  const [availiableFilters, setAvaliableFilters] = useState(AvailiableFilters)

  useEffect(() => {
    const fetchData = async (url: URL): Promise<any> => {
      try {
        return await (await fetch(url)).json()
      } catch {
        throw new Error('Unable to reach the server.')
      }
    }

    const shouldFetchData = availiableFilters.some(e => e.dataSource !== undefined && e.data === undefined)

    if (!shouldFetchData) {
      return
    }

    const fetchAllData = async (): Promise<void> => {
      const newAvailiableFilters = [
        ...availiableFilters.filter(e => e.dataSource === undefined),
        ...availiableFilters.filter(e => e.dataSource !== undefined).map(async (filter): Promise<FilterDefinition> => ({
          ...filter,
          data: await fetchData(filter.dataSource as URL)
        }))
      ]

      const results = await Promise.all(newAvailiableFilters)

      setAvaliableFilters(results)
    }

    fetchAllData().catch(() => { console.warn('Unable to fetch the filters autocomplete data.') })
  }, [availiableFilters])

  return <div>
    <AddFilterRow filters={filters} addFilter={addFilter} availiableFilters={availiableFilters} />

    <ActiveFiltersRow filters={filters} removeFilter={removeFilter} availiableFilters={availiableFilters} />
  </div>
}

export default FilterHeader
