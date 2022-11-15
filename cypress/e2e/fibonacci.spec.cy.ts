describe("page string display correctly", () => {
  before(() => {
    cy.visit("/fibonacci");
  });

  it("page has input field and disabled button", () => {
    //проверка существования поля ввода и пустое ли оно.
    cy.get('input[type="text"]').should("have.value", "");
    cy.get('input[type="text"]').should("be.empty");

    cy.get("button").should("be.disabled").contains("Рассчитать"); //кнопка неактивна
  });

  it("write a number in input field", () => {
    cy.get('input[type="text"]').type(`${5}`); //цифра для проверки
    cy.get("button").should("be.enabled"); // кнопка становится активной
  });

  it("click button and number calculate correсtly", () => {
    cy.get("button").contains("Рассчитать").click();

    cy.get('[class^="circle_circle"]').should("have.length", 1).contains(1);
    cy.wait(500);

    cy.get('[class^="circle_circle"]')
      .should("have.length", 2)
      .each(($div, index) => {
        $div.hasClass("default"); //дефолтный цвет
        if (index === 0) cy.wrap($div).contains(1);
        if (index === 1) cy.wrap($div).contains(1);
      });
    cy.wait(500);

    cy.get('[class^="circle_circle"]')
      .should("have.length", 3)
      .each(($div, index) => {
        $div.hasClass("default"); //дефолтный цвет
        if (index === 0) cy.wrap($div).contains(1);
        if (index === 1) cy.wrap($div).contains(1);
        if (index === 2) cy.wrap($div).contains(2);
      });
    cy.wait(500);

    cy.get('[class^="circle_circle"]')
      .should("have.length", 4)
      .each(($div, index) => {
        $div.hasClass("default"); //дефолтный цвет
        if (index === 0) cy.wrap($div).contains(1);
        if (index === 1) cy.wrap($div).contains(1);
        if (index === 2) cy.wrap($div).contains(2);
        if (index === 3) cy.wrap($div).contains(3);
      });
    cy.wait(500);

    cy.get('[class^="circle_circle"]')
      .should("have.length", 5)
      .each(($div, index) => {
        $div.hasClass("default"); //дефолтный цвет
        if (index === 0) cy.wrap($div).contains(1);
        if (index === 1) cy.wrap($div).contains(1);
        if (index === 2) cy.wrap($div).contains(2);
        if (index === 3) cy.wrap($div).contains(3);
        if (index === 4) cy.wrap($div).contains(5);
      });
    cy.wait(500);

    cy.get('[class^="circle_circle"]')
      .should("have.length", 6)
      .each(($div, index) => {
        $div.hasClass("default"); //дефолтный цвет
        if (index === 0) cy.wrap($div).contains(1);
        if (index === 1) cy.wrap($div).contains(1);
        if (index === 2) cy.wrap($div).contains(2);
        if (index === 3) cy.wrap($div).contains(3);
        if (index === 4) cy.wrap($div).contains(5);
        if (index === 5) cy.wrap($div).contains(8);
      });
  });
});
