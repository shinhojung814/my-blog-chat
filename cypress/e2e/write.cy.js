describe('WritePage Test', () => {
  beforeEach(() => {
    cy.visit('/admin')
    cy.get('input[type="text"]').type('admin@gmail.com')
    cy.get('input[type="password"]').type('admin1234')
    cy.get('button[type="submit"]').click()
    cy.contains('포스트 작성하기').click()
    cy.url().should('include', '/write')
  })

  it('Write Post', () => {
    cy.get('input[placeholder="제목"]').type('포스트 제목')
    cy.get('input#category').type('Test{enter}')
    cy.get('input#tags').type('Test{enter}')
    cy.get('textarea').type('포스트 내용')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/posts/')
  })

  afterEach(() => {
    cy.visit('/admin')
    cy.contains('테스트 데이터 삭제').click()
    cy.clearAllCookies()
  })
})
