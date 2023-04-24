import FormatDistance from 'components/formaters/FormatDistance'
import FormatPrice from 'components/formaters/FormatPrice'
import FormatRating from 'components/formaters/FormatRating'
import type { FilterDefinition } from 'types/Filter'
import { FilterType } from 'types/Filter'

export const AvailiableFilters = [
  {
    name: 'name',
    displayName: 'Name',
    type: FilterType.string
  },
  {
    name: 'customerRating',
    displayName: 'Customer rating',
    type: FilterType.number,
    min: 1,
    max: 5,
    defaultValue: 3,
    formatComponent: FormatRating
  },
  {
    name: 'distance',
    displayName: 'Distance',
    type: FilterType.number,
    min: 1,
    max: 10,
    defaultValue: 5,
    formatComponent: FormatDistance
  },
  {
    name: 'price',
    displayName: 'Price',
    type: FilterType.number,
    min: 10,
    max: 50,
    step: 5,
    defaultValue: 30,
    formatComponent: FormatPrice
  },
  {
    name: 'cuisine',
    displayName: 'Cuisine',
    type: FilterType.options,
    dataSource: 'http://localhost:8080/cuisine/'
  }
] as FilterDefinition[]
