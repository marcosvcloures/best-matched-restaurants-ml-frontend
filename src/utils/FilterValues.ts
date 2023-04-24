import type { FilterValue } from 'types/Filter'

function tryParseInt (value: string | null): number | string | null {
  const asNumber = parseInt(value ?? '')

  if (!isNaN(asNumber)) {
    return asNumber
  }

  return value
}

export function convertURLSearchParamsToFilterValues (filterUrl: URLSearchParams): FilterValue[] {
  return [...filterUrl.keys()].reduce<FilterValue[]>((prev, curr) => [...prev, { name: curr, value: tryParseInt(filterUrl.get(curr)) }], [])
}

export function convertFilterValuesToURLSearchParams (filters: FilterValue[]): URLSearchParams {
  const queryFilters = filters?.filter(e => e.value !== null).reduce((prev, e) => ({
    ...prev,
    [e.name]: e.value
  }), {}) ?? {}

  return new URLSearchParams(queryFilters)
}
