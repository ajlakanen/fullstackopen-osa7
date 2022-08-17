import { func } from "prop-types";

describe("Blog ", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Antero-Jaakko Liukanen",
      username: "aajii",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
    cy.contains("Bloglist app, Antti-Jussi Lakanen");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("login fails with wrong password and error shows in red color", function () {
    cy.contains("login").click();
    cy.get("#username").type("aajii");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "wrong username or password")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should(
      "not.contain",
      "Antero-Jaakko Liukanen (aajii) logged in."
    );
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("aajii");
    cy.get("#password").type("password");
    cy.get("#login-button").click();
    cy.contains("Antero-Jaakko Liukanen (aajii) logged in.");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      // kirjautuminen siirretty tiedostoon support/commands.js
      cy.login({ username: "aajii", password: "password" });
    });
    describe("new blog", function () {
      it("a new blog can be created", function () {
        cy.contains("add new blog").click();
        cy.get("#title").type("a blog created by cypress");
        cy.get("#author").type("Cypress Ltd");
        cy.get("#url").type("www.cypress.com");
        cy.contains("save").click();
        cy.contains("a blog created by cypress");
      });
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          author: "cypressi",
          title: "first cypress blog",
          url: "www.cybresz1.com",
        });
        cy.createBlog({
          author: "cypressi2",
          title: "second cypress blog",
          url: "www.cybresz2.com",
        });
        cy.createBlog({
          author: "cypressi3",
          title: "third cypress blog",
          url: "www.cybresz3.com",
        });
      });
      it("like first cypress blog", function () {
        cy.view({ title: "first cypress blog" });
        cy.like({ title: "first cypress blog" });

        cy.contains("first cypress blog")
          .parent()
          .parent()
          .contains("likes: 1");
      });

      it("like second cypress blog twice", function () {
        cy.view({ title: "second cypress blog" });
        cy.like({ title: "second cypress blog" });
        cy.like({ title: "second cypress blog" });

        cy.contains("second cypress blog")
          .parent()
          .parent()
          .contains("likes: 2");
      });

      it("blog can be deleted", function () {
        cy.contains("first cypress blog")
          .parent()
          .parent()
          .find("button")
          .contains("delete")
          .click();
        cy.get(".bloglist").should("not.contain", "first cypress blog");
      });

      it("blogs are ordered based on likes", function () {
        cy.view({ title: "second cypress blog" });
        for (let index = 0; index < 5; index++) {
          cy.like({ title: "second cypress blog" });
        }
        cy.view({ title: "third cypress blog" });
        for (let index = 0; index < 3; index++) {
          cy.like({ title: "third cypress blog" });
        }
        cy.get(".blog").eq(0).should("contain", "second cypress blog");
        cy.get(".blog").eq(1).should("contain", "third cypress blog");
        cy.get(".blog").eq(2).should("contain", "first cypress blog");
      });
    });
  });
});
