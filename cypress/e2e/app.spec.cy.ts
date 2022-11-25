//тест посещения начальной страницы
describe("empty spec", () => {
  it("should be available on baseUrl", () => {
    cy.visit("/"); // visits the baseUrl
    cy.contains("МБОУ АЛГОСОШ");
  });
});
