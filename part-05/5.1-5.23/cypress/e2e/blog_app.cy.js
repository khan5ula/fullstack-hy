describe('Blog app', function () {
  beforeEach(function () {
    /* Delete blog posts and users */
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    /* Create and post new user */
    const user = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'salasana'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    /* Navigate to main page */
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Log in to application')
  })

  it('login form is shown', function () {
    cy.get('#username-form')
    cy.get('#password-form')
    cy.contains('login')
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {

      /* Submit correct user info */
      cy.get('#username-form').type('johndoe', { force: true })
      cy.get('#password-form').type('salasana', { force: true })
      cy.get('#login-button').click()

      /* Expect success */
      cy.contains('John Doe logged in')
    })

    it('fails with wrong credentials', function () {

      /* Submit invalid username */
      cy.get('#username-form').type('janedoe', { force: true })
      cy.get('#password-form').type('salasana', { force: true })
      cy.get('#login-button').click()

      /* Expect failure */
      cy.contains('wrong username or password')

      /* Submit invalid password */
      cy.get('#username-form').clear()
      cy.get('#username-form').type('johndoe')
      cy.get('#password-form').clear()
      cy.get('#password-form').type('password')
      cy.get('#login-button').click()

      /* Expect failure */
      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      /* Login 'manually' since cy command does not seem to work */
      cy.get('#username-form').type('johndoe')
      cy.get('#password-form').type('salasana')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()

      /* Type the blog info */
      cy.get('#title').type('blog title created by cypress')
      cy.get('#author').type('cypressio')
      cy.get('#url').type('https://docs.cypress.io')

      /* Confirm blog creation */
      cy.get('#create-blog-button').click()

      /* Success message should be visible */
      cy.contains('a new blog blog title created by cypress added')

      /* The new blog should now be visible */
      cy.contains('blog title created by cypress, cypressio')
    })

    it('a blog can be liked,', function () {
      cy.contains('create new blog').click()

      /* Type the blog info */
      cy.get('#title').type('blog title created by cypress')
      cy.get('#author').type('cypressio')
      cy.get('#url').type('https://docs.cypress.io')

      /* Confirm blog creation */
      cy.get('#create-blog-button').click()

      /* Show button should be visible, click it! */
      cy.contains('show').click()

      /* Like button should be visible, click it! */
      cy.get('#like-button').click()

      /* Operation should be successful */
      cy.contains('liked blog: blog title created by cypress, cypressio')
      cy.contains('likes: 1')
    })

    it('a blog can be removed', function () {
      cy.contains('create new blog').click()

      /* Type the blog info */
      cy.get('#title').type('blog title created by cypress')
      cy.get('#author').type('cypressio')
      cy.get('#url').type('https://docs.cypress.io')

      /* Confirm blog creation */
      cy.get('#create-blog-button').click()

      /* Show button should be visible, click it! */
      cy.contains('show').click()

      /* Remove button should be visible, click it! */
      cy.contains('remove').click()

      /* The blog should not be visible anymore */
      cy.get('html').should('not.contain', 'blog title created by cypress')
    })

    it('only post owner can see the remove button', function () {
      cy.contains('create new blog').click()

      /* Type the blog info */
      cy.get('#title').type('blog title created by cypress')
      cy.get('#author').type('cypressio')
      cy.get('#url').type('https://docs.cypress.io')

      /* Confirm blog creation */
      cy.get('#create-blog-button').click()

      /* Logout */
      cy.get('#logout-button').click()

      /* Create a new user and login */
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, { name: 'Second User', username: 'secondUser', password: 'password' })
      cy.get('#username-form').type('secondUser')
      cy.get('#password-form').type('password')
      cy.get('#login-button').click()

      /* Show button should be visible, click it! */
      cy.contains('show').click()

      /* Remove button should not be visible */
      cy.get('.blog').should('not.contain', 'remove')
    })

    it('blog posts should be sorted by likes', function () {
      /* This test is ugly but it works */

      cy.contains('create new blog').click()

      /* Post the first blog */
      cy.get('#title').type('First blog, should be sorted as third')
      cy.get('#author').type('cypressio')
      cy.get('#url').type('https://docs.cypress.io')
      cy.get('#create-blog-button').click()

      /* Post the second blog */
      cy.get('#title').type('Second blog, should be sorted as third')
      cy.get('#author').type('cypressio')
      cy.get('#url').type('https://docs.cypress.io')
      cy.get('#create-blog-button').click()

      /* Post the third blog */
      cy.get('#title').type('Third blog, should be sorted as second')
      cy.get('#author').type('cypressio')
      cy.get('#url').type('https://docs.cypress.io')
      cy.get('#create-blog-button').click()

      /* Like the first blog twice */
      cy.contains('div.blog', 'First blog')
        .contains('show')
        .click()

      for (let i = 0; i < 2; i++) {
        cy.contains('div.blog', 'First blog')
          .contains('like').click()
          .then(function () {
            cy.wait(300)
          })
      }

      /* Like the second blog five times */
      cy.contains('div.blog', 'Second blog')
        .contains('show')
        .click()

      for (let i = 0; i < 5; i++) {
        cy.contains('div.blog', 'Second blog')
          .contains('like').click()
          .then(function () {
            cy.wait(300)
          })
      }

      /* Like the third blog four times */
      cy.contains('div.blog', 'Third blog')
        .contains('show')
        .click()

      for (let i = 0; i < 4; i++) {
        cy.contains('div.blog', 'Third blog')
          .contains('like').click()
          .then(function () {
            cy.wait(300)
          })
      }

      /*
          The order of the blogs should now be:
          1. Second blog
          2. Third blog
          3. First blog
      */
      cy.get('.blog').eq(0).should('contain', 'Second blog')
      cy.get('.blog').eq(1).should('contain', 'Third blog')
      cy.get('.blog').eq(2).should('contain', 'First blog')
    })
  })
})