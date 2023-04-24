import React, { useEffect, useState } from 'react'
import type { FilterValue } from 'types/Filter'
import type { Restaurant } from 'types/Restaurant'
import { convertFilterValuesToURLSearchParams } from 'utils/FilterValues'
import FormatDistance from 'components/formaters/FormatDistance'
import FormatPrice from 'components/formaters/FormatPrice'
import FormatRating from 'components/formaters/FormatRating'

import './ResultTable.css'

function ResultTable ({ filters }: { filters: FilterValue[] }): JSX.Element {
  const [data, setData] = useState(undefined as Restaurant[] | undefined)
  const [noInternet, setNoInternet] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()

    setData(undefined)

    const queryFilters = convertFilterValuesToURLSearchParams(filters)

    const fetchData = async (): Promise<void> => {
      const url = `http://localhost:8080/restaurant/filter?${new URLSearchParams(queryFilters).toString()}`

      const json = await (await fetch(url, { signal: abortController.signal })).json()

      setData(json)
    }

    fetchData().catch(() => {
      setNoInternet(true)
      abortController.abort()
    })

    return () => { abortController.abort() }
  }, [filters])

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Customer rating</th>
          <th>Distance</th>
          <th>Price</th>
          <th>Cuisine</th>
        </tr>
      </thead>
      <tbody>
        { data === undefined && !noInternet && <tr><td colSpan={5}>Loading recomendations...</td></tr> }
        { data === undefined && noInternet && <tr><td colSpan={5}>Unable to reach the server, verify your internet.</td></tr> }
        { data?.length === 0 && <tr><td colSpan={5}>There are no restaurants that meet the filters :(</td></tr> }
        {
          data?.map(row => <tr key={row.name}>
            <td>{row.name}</td>
            <td className='center'><FormatRating value={row.customerRating} /></td>
            <td><FormatDistance value={row.distance} /></td>
            <td><FormatPrice value={row.price} /></td>
            <td>{row.cuisine.name}</td>
          </tr>)
        }
      </tbody>
    </table>
  )
}

export default ResultTable
