describe('External links', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {

      cy.get('[data-cy=learn-about-pressbooks]').as('learnAboutPressbooks');
      cy.get('[data-cy=pressbooks-homepage]').as('pressbooksHomepage');
      cy.get('[data-cy=twitter-social-link]').as('twitterProfile');
      cy.get('[data-cy=linkedin-social-link]').as('linkedinProfile');
      cy.get('[data-cy=youtube-social-link]').as('youtubeProfile');
    });

    it('"Learn about PressbooksEDU" has no broken link', () => {
      cy.get('@learnAboutPressbooks')
        .should('have.attr', 'href', 'https://pressbooks.com')
        .should('have.attr', 'rel', 'noopener')
        .then((link) => {
          cy.request(link.prop('href')).its('status').should('eq', 200)
        });
    });

    it('"Pressbooks logo" has no broken link', () => {
      cy.get('@pressbooksHomepage')
        .should('have.attr', 'href', 'https://pressbooks.com')
        .should('have.attr', 'rel', 'noopener')
        .then((link) => {
          cy.request(link.prop('href')).its('status').should('eq', 200)
        });
    });

    it('"Social links" have no broken links', () => {
      const socials = [
        { name: '@twitterProfile', href: 'https://twitter.com/pressbooks' },
        { name: '@linkedinProfile', href: 'https://www.linkedin.com/company/pressbooks' },
        { name: '@youtubeProfile', href: 'https://www.youtube.com/channel/UCyMeJ5C4p6AxF9QXg6Bgzjg' },
      ];

      socials.forEach((social) => {
        cy.get(social.name)
          .should('have.attr', 'href', social.href)
          .should('have.attr', 'rel', 'noopener');
      });
    });
  });
});
