import React from 'react'
import App from './App'
import { mount } from 'cypress/react'

describe('<FormatRating />', () => {
  it('renders', () => {
    mount(<App />)
  })
})
