import React from 'react'

function FormatPrice ({ value }: { value: number | string }): JSX.Element {
  if (value === '') {
    return <></>
  }

  return <>{`$ ${value}`}</>
}

export default FormatPrice
