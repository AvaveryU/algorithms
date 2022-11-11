//тест роутинга
describe("app works correctly with routes", () => {
  before(() => {
    cy.visit("/recursion");
  });

  it("открытие страницы с алгоритмом СТРОКА", () => {
    cy.contains("Строка");
  });

  it("клик по кнопке РАЗВЕРНУТЬ", () => {
    cy.get("button").contains("Развернуть").click();
    //cy.contains('Доставка');
  });

  // it('should open agreement page after continue button click', function() {
  //   cy.contains('Обычная доставка').click();
  //   cy.get('button').contains('Продолжить оформление').click();
  //   cy.contains('Подтверждение заказа');
  // });
});
