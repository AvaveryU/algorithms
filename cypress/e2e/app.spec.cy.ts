//тест посещения начальной страницы
describe("empty spec", () => {
  it("should be available on localhost:3000", () => {
    cy.visit("/"); // visits the baseUrl
    cy.contains("МБОУ АЛГОСОШ");
  });
});
