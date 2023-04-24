import type { ComponentClass, FunctionComponent } from 'react'

export enum FilterType {
  string,
  number,
  options
}

export interface FilterDefinition {
  name: string
  displayName: string
  type: FilterType
  min: number | undefined
  max: number | undefined
  step: number | undefined
  dataSource: URL | undefined
  data: any[]
  defaultValue: number | string
  formatComponent: string | FunctionComponent<{ value: string | number | null }> | ComponentClass<{ value: string | number | null }, any>
}

export interface FilterValue {
  name: string
  value: string | number | null
}
