import React, { useEffect, useState } from 'react'
import type { Cuisine } from 'types/Cuisine'
import type { FilterDefinition } from 'types/Filter'
import { callOnEnter } from 'utils/Input'

import './AutoCompleteInput.css'

function AutoCompleteInput ({ currentFilter, filterValue, updateFilterValue, addFilterCallback }: { currentFilter: FilterDefinition, filterValue: string, updateFilterValue: (newFilter: string | number) => void, addFilterCallback: () => void }): JSX.Element {
  const [focusInput, setFocusInput] = useState(false)
  const [mouseInOptions, setMouseInOptions] = useState(false)

  useEffect(() => {
    return () => { console.log('unmount') }
  }, [])

  function setOptionByClick (value: string): void {
    updateFilterValue(value)
    setFocusInput(false)
    setMouseInOptions(false)
  }

  function filteredData (): Cuisine[] {
    const filterValueLowerCase = filterValue.toLowerCase()

    return currentFilter.data?.filter((option: Cuisine) => option.name.toLowerCase().includes(filterValueLowerCase))
  }

  function showSuggestOptions (): boolean {
    return focusInput || mouseInOptions
  }

  return <div className='flex flex-column relative' onFocus={_ => { setFocusInput(true) }} onBlur={_ => { setFocusInput(false) }}>
    <input type='text' value={filterValue} onKeyDown={evt => { callOnEnter(evt, addFilterCallback) }} onChange={evt => { updateFilterValue(evt.target.value) }} placeholder={`Search by ${currentFilter.displayName.toLocaleLowerCase()}...`} />
    { showSuggestOptions() && (
      <ul className='autocomplete' onMouseEnter={_ => { setMouseInOptions(true) }} onMouseLeave={_ => { setMouseInOptions(false) }}>
        {filteredData()?.map((option: Cuisine) => (
          <li key={option.id} onClick={() => { setOptionByClick(option.name) }}>
            {option.name}
          </li>
        ))}
      </ul>
    )}
  </div>
}

export default AutoCompleteInput
