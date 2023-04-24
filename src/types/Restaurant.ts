import type { Cuisine } from './Cuisine'

export interface Restaurant {
  name: string
  customerRating: number
  distance: number
  price: number
  cuisine: Cuisine
}
