describe('HomePage Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Sidebar', () => {
    cy.get('[data-cy="sidebarToggle"]').click()

    cy.contains('홈')
    cy.contains('태그')

    cy.get('[data-cy="blogLink"]').should(
      'have.attr',
      'href',
      'https://www.notion.so/shinhojung814/Shinho-Jung-2486b27273134677ba8f3b73201a3b28',
    )

    cy.get('[data-cy="githubLink"]').should(
      'have.attr',
      'href',
      'https://github.com/shinhojung814',
    )
  })

  it('Move to SearchPage', () => {
    cy.get('[data-cy="searchLink"]').click()
    cy.url().should('include', '/search')
  })

  it('PostList', () => {
    cy.get('a[href*="/posts/"]').first().click()
    cy.url().should('include', '/posts/')
  })

  it('Footer', () => {
    cy.contains('ABOUT ME')
    cy.contains('프론트엔드 개발자 정신호')

    cy.get('[data-cy="adminLink"]').click()
    cy.url().should('include', '/admin')

    cy.get('[data-cy="writeLink"]').click()
    cy.url().should('not.include', '/write')
  })
})
