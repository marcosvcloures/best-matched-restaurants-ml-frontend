import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterHeader from 'components/filterHeader/FilterHeader'
import ResultTable from 'components/resultTable/ResultTable'
import type { FilterValue } from 'types/Filter'
import { convertFilterValuesToURLSearchParams, convertURLSearchParamsToFilterValues } from 'utils/FilterValues'

function MainPage (): JSX.Element {
  const [filterUrl, setFilterUrl] = useSearchParams()
  const [filters, setFilters] = useState(convertURLSearchParamsToFilterValues(filterUrl))

  function addFilter (filter: FilterValue): void {
    setFilters([...filters, filter])
  }

  function removeFilter (filter: FilterValue): void {
    setFilters(filters.filter(e => e.name !== filter.name))
  }

  useEffect(() => {
    setFilterUrl(convertFilterValuesToURLSearchParams(filters))
  }, [filters, setFilterUrl])

  return <>
    <FilterHeader filters={filters} addFilter={addFilter} removeFilter={removeFilter} />
    <ResultTable filters={filters} />
  </>
}

export default MainPage
