/* eslint-disable no-undef */

describe('best restaurant match', () => {
  beforeEach(() => {
    cy.fixture('cuisines.json').as('cuisines')
    cy.fixture('defaultFilter.json').as('defaultFilter')

    cy.visit('http://localhost:3000/')
  })

  it('should have 5 possible filters', () => {
    cy.get('.add-filter-row').get('span.filter').should('have.length', 5)
  })

  it('it should have 5 rows', () => {
    cy.intercept('GET', '**/filter*', { fixture: 'defaultFilter.json' }).as('getFiltered')

    cy.get('tbody tr').should('have.length', 5)
  })

  it('clicking Name filter should open a modal', () => {
    cy.get('span.filter').contains('Name').click()

    cy.get('.add-filter-tooltip').should('have.length', 1)
  })

  it('clicking Customer rating filter should open a modal', () => {
    cy.get('span.filter').contains('Customer rating').click()

    cy.get('.add-filter-tooltip').should('have.length', 1)
  })

  it('clicking Distance filter should open a modal', () => {
    cy.get('span.filter').contains('Distance').click()

    cy.get('.add-filter-tooltip').should('have.length', 1)
  })

  it('clicking Price filter should open a modal', () => {
    cy.get('span.filter').contains('Price').click()

    cy.get('.add-filter-tooltip').should('have.length', 1)
  })

  it('clicking Cuisine filter should open a modal', () => {
    cy.get('span.filter').contains('Cuisine').click()

    cy.get('.add-filter-tooltip').should('have.length', 1)
  })

  it('clicking Cuisine modal autocomplete click should work', () => {
    cy.intercept('GET', '**/cuisine/', { fixture: 'cuisines.json' }).as('getCuisines')

    cy.wait('@getCuisines')

    cy.get('span.filter').contains('Cuisine').click()

    cy.get('input[type=text]').first().type('Ame')

    cy.get('li').first().click()

    cy.get('input[type=text]').should('have.value', 'American')
  })

  it('clicking Cuisine modal autocomplete filter should work and be case insensitive', () => {
    cy.intercept('GET', '**/cuisine/', { fixture: 'cuisines.json' }).as('getCuisines')

    cy.wait('@getCuisines')

    cy.get('span.filter').contains('Cuisine').click()

    cy.get('input[type=text]').first().type('Ame')

    cy.get('li').should('have.length', 2)
  })

  it('the modal can be cancelled', () => {
    cy.get('span.filter').contains('Name').click()

    cy.get('button.red-hover').contains('Cancel').click()

    cy.get('.add-filter-tooltip').should('have.length', 0)
  })

  it('the modal filter can apply the filters ', () => {
    cy.get('span.filter').contains('Name').click()

    cy.get('input[type=text]').first().type('test')

    cy.get('button.green-hover').contains('Apply').should('have.length', 1)
  })

  it('the modal filter must request the updated values (no results)', () => {
    cy.intercept('GET', '**/filter?name=test', { fixture: 'defaultFilter3.json' }).as('getFiltered')

    cy.get('span.filter').contains('Name').click()

    cy.get('input[type=text]').first().type('test')

    cy.get('button.green-hover').contains('Apply').click()

    cy.get('tbody tr td').contains('There are no restaurants that meet the filters :(').should('have.length', 1)
  })

  it('the modal filter must request the updated values (with results)', () => {
    cy.intercept('GET', '**/filter', { fixture: 'defaultFilter.json' }).as('getFiltered')
    cy.intercept('GET', '**/filter?name=test', { fixture: 'defaultFilter2.json' }).as('response')

    cy.get('span.filter').contains('Name').click()

    cy.get('input[type=text]').first().type('test')

    cy.get('button.green-hover').contains('Apply').click()

    cy.get('tbody tr').should('have.length', 2)
  })

  it('the filter must appear in the filters row', () => {
    cy.get('span.filter').contains('Name').click()

    cy.get('input[type=text]').first().type('test')

    cy.get('button.green-hover').contains('Apply').click()

    cy.get('.active-filter-row span.filter').should('have.length', 1)
  })

  it('the filter must appear in the filters row and display the filter value', () => {
    cy.get('span.filter').contains('Name').click()

    cy.get('input[type=text]').first().type('test')

    cy.get('button.green-hover').contains('Apply').click()

    cy.get('.active-filter-row span.filter').contains('Name: test').should('have.length', 1)
  })

  it('the filter can be removed', () => {
    cy.intercept('GET', '**/filter', { fixture: 'defaultFilter.json' }).as('getFiltered')
    cy.intercept('GET', '**/filter?', { fixture: 'defaultFilter.json' }).as('getFiltered')
    cy.intercept('GET', '**/filter?name=test', { fixture: 'defaultFilter2.json' }).as('response')

    cy.get('span.filter').contains('Name').click()

    cy.get('input[type=text]').first().type('test')

    cy.get('button.green-hover').contains('Apply').click()

    cy.get('span.close-button').first().invoke('show').click()

    cy.get('tbody tr').should('have.length', 5)
  })

  it('the filter can be removed and will leave the filter row', () => {
    cy.get('span.filter').contains('Name').click()

    cy.get('input[type=text]').first().type('test')

    cy.get('button.green-hover').contains('Apply').click()

    cy.get('span.close-button').first().invoke('show').click()

    cy.get('.add-filter-row').get('span.filter').should('have.length', 5)
  })

  it('the add filter row should disapear when all filters are set', () => {
    cy.get('.add-filter-row span.filter').first().click()

    cy.get('input[type=text]').type('test')

    cy.get('button.green-hover').contains('Apply').click()

    cy.get('.add-filter-row span.filter').first().click()

    cy.get('button.green-hover').contains('Apply').click()

    cy.get('.add-filter-row span.filter').first().click()

    cy.get('button.green-hover').contains('Apply').click()

    cy.get('.add-filter-row span.filter').first().click()

    cy.get('button.green-hover').contains('Apply').click()

    cy.get('.add-filter-row span.filter').first().click()

    cy.get('input[type=text]').type('test')

    cy.get('button.green-hover').contains('Apply').click()

    cy.contains('Filter by').should('have.length', 0)
  })
})
