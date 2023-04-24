import React from 'react'
import './FormatRating.css'

function FormatRating ({ value }: { value: number }): JSX.Element {
  return <div className='inline-block'>
    {Array.from({ length: 5 }).map((_, index) => <span key={index} className={`fa fa-star rating ${index < value ? 'checked' : ''}`} />)}
  </div>
}

export default FormatRating
