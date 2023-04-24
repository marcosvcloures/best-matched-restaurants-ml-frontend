import React from 'react'

function FormatDistance ({ value }: { value: number | string }): JSX.Element {
  if (value === '') {
    return <></>
  }

  if (value === 1) {
    return <>1 mile</>
  }

  return <>{`${value} miles`}</>
}

export default FormatDistance
