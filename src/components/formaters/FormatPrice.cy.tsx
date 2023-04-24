import React from 'react'
import FormatPrice from './FormatPrice'
import { mount } from 'cypress/react'

describe('<FormatPrice />', () => {
  it('renders', () => {
    mount(<FormatPrice value={2}/>)
  })

  it('displays correctly with value', () => {
    mount(<FormatPrice value={2} />)

    cy.contains('$ 2').should('have.length', 1)
  })

  it('displays nothing when empty', () => {
    mount(<FormatPrice value={''} />)

    cy.contains('$').should('have.length', 0)
  })
})
