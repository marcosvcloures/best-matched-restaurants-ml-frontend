import React from 'react'
import { mount } from 'cypress/react'
import FormatDistance from './FormatDistance'

describe('<FormatDistance />', () => {
  it('renders', () => {
    mount(<FormatDistance value={1}/>)
  })

  it('displays should say 1 mile', () => {
    mount(<FormatDistance value={1}/>)

    cy.contains('1 mile').should('have.length', 1)
  })

  it('displays should say miles', () => {
    mount(<FormatDistance value={2}/>)

    cy.contains('2 miles').should('have.length', 1)
  })
})
