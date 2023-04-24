import React from 'react'
import { mount } from 'cypress/react'
import FormatRating from './FormatRating'

describe('<FormatRating />', () => {
  it('renders', () => {
    mount(<FormatRating value={5}/>)
  })

  Cypress._.times(5, k => {
    it(`displays the right amount of stars ${k}`, () => {
      mount(<FormatRating value={k}/>)

      cy.get('span').should('have.length', 5)
      cy.get('.checked').should('have.length', k)
    })
  })
})
