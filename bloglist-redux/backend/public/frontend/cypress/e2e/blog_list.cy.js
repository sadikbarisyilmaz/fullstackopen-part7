describe('Blog List', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test-user-name',
      username: 'test-user-username',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('')

  })
  it('Login form is shown', function () {
    cy.get('.go-to-login').click()
    cy.contains('Log In to BlogLister')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.get('.go-to-login').click()

    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.fail')
        .should('contain', 'invalid username or password')
        .and('have.css', 'border-color', 'rgb(229, 231, 235)')

      cy.get('html').should('not.contain', 'test-user-name Logged In')
      cy.contains('test-user-name Logged In').should('not.exist')
    })
    it('succeeds with correct credentials', function () {
      // cy.get('#username').type('test-user-username')
      // cy.get('#password').type('sekret')
      // cy.get('#login-button').click()
      cy.login({ username: 'test-user-username', password: 'sekret' })
      cy.wait(500)
      cy.get('.toggle').click()
      cy.contains('test-user-name Logged In')

    })


  })

  describe('when Logged In', function () {
    beforeEach(function () {
      cy.login({ username: 'test-user-username', password: 'sekret' })
      cy.get('.toggle').click()
      cy.get('#user-menu').click()
      cy.contains('test-user-name Logged In')

    })

    it('a new blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test-url.com')
      cy.contains('Submit').click()
      cy.wait(500)
      cy.contains('test title')
    })


    describe('after creating a blog', function () {
      beforeEach(function () {
        cy.contains('New Blog').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('test author')
        cy.get('#url').type('www.test-url.com')
        cy.contains('Submit').click()
        cy.contains('test title')
      })

      it('a new blog can be liked', function () {

        cy.contains('test title')

        cy.contains('View').click()
        cy.get('.likeBtn').click()
        cy.get(".likes").contains('1')

      })
      it('a new blog can be deleted', function () {

        cy.contains('test title')
        cy.contains('View').click()
        cy.get('#delete-btn').click()
        cy.contains('test title').should('not.exist')

      })

      it(' only the creator can see the delete button of a blog, not anyone else', function () {
        cy.get('#user-menu').click()
        cy.contains('Logout').click()

        const user = {
          name: 'test-user-name2',
          username: 'test-user-username2',
          password: 'sekret'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'test-user-username2', password: 'sekret' })
        cy.get('#go-to-blogs').click()
        cy.wait(500)

        cy.contains('test title')
        cy.contains('View').click()
        cy.get('#delete-btn').should('not.exist')

      })
      //Style changed
      // it('blogs are ordered according to likes with the blog with the most likes being first', function () {
      //   cy.get('#user-menu').click()
      //   cy.contains('New Blog').click()
      //   cy.get('#title').type('The title with the most likes')
      //   cy.get('#author').type('most like author')
      //   cy.get('#url').type('www.most-like-url.com')
      //   cy.contains('Submit').click()
      //   cy.wait(500)
      //   cy.contains('The title with the most likes')
      //   cy.contains('View').click()
      //   cy.get('.likeBtn').click()
      //   cy.wait(500)
      //   cy.get('.likeBtn').click()
      //   cy.wait(500)
      //   cy.contains('View').click()
      //   cy.contains('Hide').click()

      //   cy.get('.likeBtn').click()
      //   cy.wait(500)
      //   cy.get('.likeBtn').click()
      //   cy.wait(500)

      //   cy.get('.likeBtn').click()
      //   cy.wait(500)

      //   cy.get('.indv-blog').should('contain', 'The title with the most likes')
      //   cy.get('.indv-blog').should('contain', 'test title')
      // })
    })
  })
})