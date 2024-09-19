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
      process.env.NEXT_PUBLIC_BLOG_URL,
    )

    cy.get('[data-cy="githubLink"]').should(
      'have.attr',
      'href',
      process.env.NEXT_PUBLIC_GITHUB_URL,
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
