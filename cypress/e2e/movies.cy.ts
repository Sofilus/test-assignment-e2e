beforeEach(() => {
  cy.visit('/');
});

 it('passes', () => {
    cy.visit('http://localhost:1234');
  });

describe('Tests basic elements', () => {
  
  it("should contain a input field", () => {

    cy.get("input").should("exist");
  });
  
  it("should contain a input field with a value", () => {

    cy.get("input").type("love").should("have.value", "love");
  });
  
  it("should be able to click the search button", () => {

    cy.get("button").click();
  });
});

describe('Tests happyflow when movie are searched using api', () => {

  it("should see if div with movies exists and contains correct html tags", () => {

    cy.get("input").type("love").should("have.value", "love");
    cy.get("button").click();

    cy.get("div#movie-container").should("exist");
    cy.get("div.movie").should("contain.html", "h3");
    cy.get("div.movie").should("contain.html", "img");
  });
});

describe('Tests happyflow when movie are searched using mockdata', () => {

  it("should see if div with movies contains h3 tag", () => {

    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture: "movieResponse"}).as("omdbCall");
    cy.get("button").click();

    cy.get("div.movie").should("contain.html", "h3");
  });

  it("should see if div with movies contains img tag", () => {

    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture: "movieResponse"}).as("omdbCall");
    cy.get("button").click();

    cy.get("div.movie").should("contain.html", "img");
  });
});


describe('Test if inputfield are empty when serachbutton are clicked', () => {

  it("should show a p tag using api", () => {

    cy.get("input").should("contain", "");
    cy.get("button").click();

    cy.get("div#movie-container").should("contain.html", "p");
  });

  it("should show a p tag using mockdata", () => {

    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture: "emptyMovieResponse"}).as("emptyOmdbCall");
    cy.get("input").should("contain", "");
    cy.get("button").click();

    cy.get("div#movie-container").should("contain.html", "p");
  });
});


describe('Test if a searched movie doesnt exist', () => {

  it("should show a p tag using api", () => {

      cy.get("input").type("3");
      cy.get("button").click();

      cy.get("div#movie-container").should("contain.html", "p");
  });

    it("should show a p tag using mockdata", () => {

      cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture: "emptyMovieResponse"}).as("emptyOmdbCall");
      cy.get("input").type("3");
      cy.get("button").click();

      cy.get("div#movie-container").should("contain.html", "p");
  });
});

describe('Test if url change correctly', () => {

  it("should get mock data with correct url", () => {

      cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture: "movieResponse"}).as("omdbCall");
      cy.get("input").type("love");
      cy.get("button").click();

      cy.wait("@omdbCall").its("request.url").should("contain", "love");
  });
});


describe('Test if incorrect search word are typed in to input', () => {

  it("should return error using api", () => {

    cy.get("input").type("<p></p>").should("have.value", "<p></p>");
    cy.get("button").click();

    cy.get("div#movie-container").should("contain.html", "p");
  });

  it("should return error using mockdata", () => {

    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture: "errorMovieResponse"}).as("errorOmdbCall");
    cy.get("input").type("<p></p>").should("have.value", "<p></p>");
    cy.get("button").click();
  });
});