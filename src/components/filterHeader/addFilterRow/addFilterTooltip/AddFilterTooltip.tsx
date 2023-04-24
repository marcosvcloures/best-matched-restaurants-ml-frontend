import React, { useEffect, useState } from 'react'
import { FilterType } from 'types/Filter'
import type { FilterDefinition, FilterValue } from 'types/Filter'

import './AddFilterTooltip.css'
import AutoCompleteInput from './autoCompleteInput/AutoCompleteInput'
import { callOnEnter } from 'utils/Input'

function ShowFilterOptions ({ currentFilter, filterValue, updateFilterValue, addFilterCallback }: {
  currentFilter: FilterDefinition
  filterValue: string | number
  updateFilterValue: (newFilter: string | number) => void
  addFilterCallback: () => void }): JSX.Element {
  switch (currentFilter.type) {
    case FilterType.number:
      return <div className='flex flex-column relative'>
        <input type='range' min={currentFilter.min} max={currentFilter.max} step={currentFilter.step} value={filterValue} onChange={evt => { updateFilterValue(parseInt(evt.target.value)) }} />
        { currentFilter.formatComponent !== undefined ? React.createElement(currentFilter.formatComponent, { value: filterValue }) : filterValue}
      </div>

    case FilterType.string:
      return <div className='flex flex-column relative'>
        <input type='text' value={filterValue as string} onChange={evt => { updateFilterValue(evt.target.value) }} onKeyDown={evt => { callOnEnter(evt, addFilterCallback) }} placeholder={`Search by ${currentFilter.displayName.toLocaleLowerCase()}...`} />
      </div>

    case FilterType.options:
      return <AutoCompleteInput currentFilter={currentFilter} filterValue={filterValue as string} addFilterCallback={addFilterCallback} updateFilterValue={updateFilterValue} />

    default:
      return <>Unsupported filter type</>
  }
}

function AddFilterTooltip ({ currentFilter, setCurrentFilter, addFilter }: {
  currentFilter: FilterDefinition
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterDefinition | undefined>>
  addFilter: (filter: FilterValue) => void
}): JSX.Element {
  const [filterValue, setFilterValue] = useState('' as string | number)

  useEffect(() => {
    if (currentFilter.defaultValue !== undefined) {
      setFilterValue(currentFilter.defaultValue)

      return
    }

    setFilterValue('')
  }, [currentFilter.defaultValue])

  function clearTooltip (): void {
    setCurrentFilter(undefined)
  }

  function addFilterAndClearTooltip (): void {
    addFilter({ name: currentFilter.name, value: filterValue })

    clearTooltip()
  }

  function updateFilterValue (value: string | number): void {
    setFilterValue(value)
  }

  return <div className='add-filter-tooltip'>
    <div className='tooltip'>
      <div className='tooltip-body'>
        <ShowFilterOptions currentFilter={currentFilter} filterValue={filterValue} updateFilterValue={updateFilterValue} addFilterCallback={addFilterAndClearTooltip} />
      </div>
      <div className='tooltip-footer'>
        <button className='red-hover' onClick={evt => { clearTooltip(); evt.preventDefault() }}>Cancel</button>
        {
          filterValue !== '' && <button className='green-hover' onClick={evt => { addFilterAndClearTooltip(); evt.preventDefault() }}>Apply</button>
        }
      </div>
    </div>
  </div>
}

export default AddFilterTooltip
