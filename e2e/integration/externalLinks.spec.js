describe('External links', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.get('[data-cy=learn-about-pressbooks]').as('learnAboutPressbooks');
      cy.get('[data-cy=pressbooks-homepage]').as('pressbooksHomepage');
      cy.get('[data-cy=pressbooks-blog]').as('pressbooksBlog');
      cy.get('[data-cy=pressbooks-opensource]').as('pressbooksOpensource');
      cy.get('[data-cy=pressbooks-contact]').as('pressbooksContact');
      cy.get('[data-cy=pressbooks-jobs]').as('pressbooksJobs');
      cy.get('[data-cy=pressbooks-accessibility]').as('pressbooksAccessibility');
      cy.get('[data-cy=pressbooks-procurement]').as('pressbooksProcurement');
      cy.get('[data-cy=twitter-social-link]').as('twitterProfile');
      cy.get('[data-cy=linkedin-social-link]').as('linkedinProfile');
      cy.get('[data-cy=youtube-social-link]').as('youtubeProfile');
    });

    it('"Learn about PressbooksEDU" has no broken link', () => {
      cy.get('@learnAboutPressbooks')
        .should('have.attr', 'href', 'https://pressbooks.com')
        .should('have.attr', 'rel', 'noopener')
        .then((link) => {
          cy.request(link.prop('href')).its('status').should('eq', 200);
        });
    });

    it('"Pressbooks logo" has no broken link', () => {
      cy.get('@pressbooksHomepage')
        .should('have.attr', 'href', 'https://pressbooks.com')
        .should('have.attr', 'rel', 'noopener')
        .then((link) => {
          cy.request(link.prop('href')).its('status').should('eq', 200);
        });
    });

    it('Footer has no broken links', () => {
      cy.get('@pressbooksBlog')
        .should('have.attr', 'href', 'https://pressbooks.com/blog')
        .should('have.attr', 'rel', 'noopener')
        .then( (link ) => {
          cy.request(link.prop('href')).its('status').should('eq', 200);
        });
      cy.get('@pressbooksOpensource')
        .should('have.attr', 'href', 'https://pressbooks.org')
        .should('have.attr', 'rel', 'noopener')
        .then( (link ) => {
          cy.request(link.prop('href')).its('status').should('eq', 200);
        });
      cy.get('@pressbooksContact')
        .should('have.attr', 'href', 'https://pressbooks.com/contact-pressbooks/')
        .should('have.attr', 'rel', 'noopener')
        .then( (link ) => {
          cy.request(link.prop('href')).its('status').should('eq', 200);
        });
      cy.get('@pressbooksJobs')
        .should('have.attr', 'href', 'https://pressbooks.com/about/#work-with-us')
        .should('have.attr', 'rel', 'noopener')
        .then( (link ) => {
          cy.request(link.prop('href')).its('status').should('eq', 200);
        });
      cy.get('@pressbooksAccessibility')
        .should('have.attr', 'href', 'https://pressbooks.com/accessibility/')
        .should('have.attr', 'rel', 'noopener')
        .then((link) => {
          cy.request(link.prop('href')).its('status').should('eq', 200);
        });
      cy.get('@pressbooksProcurement')
        .should('have.attr', 'href', 'https://pressbooks.com/edu-procurement-helpers/')
        .should('have.attr', 'rel', 'noopener')
        .then((link) => {
          cy.request(link.prop('href')).its('status').should('eq', 200);
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
