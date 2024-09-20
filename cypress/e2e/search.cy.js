describe('SearchPage Test', () => {
  beforeEach(() => {
    cy.visit('/search')
  })

  // it('Messages', () => {
  //   cy.contains('무엇이든 물어보세요.')
  //   cy.get('[data-cy*="message-"]').should('have.length', 1)
  //   cy.get('input').type('안녕하세요.')
  //   cy.get('button[type="submit"]').click()
  //   cy.get('[data-cy*="message-"]').should('have.length', 3)
  // })

  // it('Reset Messages', () => {
  //   cy.get('input').type('안녕하세요.')
  //   cy.get('button[type="submit"]').click()
  //   cy.contains('답변을 작성하는 중입니다.').should('exist')
  //   cy.get('[data-cy*="message-"]').should('have.length', 3)
  //   cy.wait(3000)
  //   cy.contains('답변을 작성하는 중입니다.').should('not.exist')
  //   cy.get('input').should('have.value', '')
  //   cy.contains('대화 초기화').click()
  //   cy.on('window:confirm', cy.stub().returns(true))
  //   cy.get('[data-cy*="message-"]').should('have.length', 1)
  // })
})
