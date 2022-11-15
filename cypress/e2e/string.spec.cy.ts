describe("page string display correctly", () => {
  before(() => {
    cy.visit("/recursion");
  });

  it("page has input field and disabled button", () => {
    //проверка существования поля ввода и пустое ли оно.
    cy.get('input[type="text"]').should("have.length", 1);
    cy.get('input[type="text"]').should("be.empty");

    cy.get("button").should("be.disabled"); //кнопка неактивна
  });

  it("write a string in input field", () => {
    cy.get('input[type="text"]').type("hello"); //слово для проверки
    cy.get("button").should("be.enabled"); // кнопка становится активной
  });

  it("click button and string unwrapping correсtly", () => {
    cy.get("button").contains("Развернуть").click();
    cy.get("button").should("be.disabled");

    //находим circle и на каждом делаем проверку
    cy.get('[class^="circle_circle"]').each(($div, index) => {
      $div.hasClass("default"); //дефолтный цвет
      if (index === 0) cy.wrap($div).contains("h");
      if (index === 1) cy.wrap($div).contains("e");
      if (index === 2) cy.wrap($div).contains("l");
      if (index === 3) cy.wrap($div).contains("l");
      if (index === 4) cy.wrap($div).contains("o");
    });

    cy.wait(1000);

    cy.get('[class^="circle_circle"]').each(($div, index) => {
      if (index === 0 || index === 4) {
        cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }
    });

    cy.get('[class^="circle_circle"]').each(($div, index) => {
      if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("o");
      if (index === 4) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("h");

      if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("e");
      if (index === 3) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("l");
    });

    cy.get('[class^="circle_circle"]').each(($div, index) => {
      if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("l");
      if (index === 3) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("e");

      if (index === 2) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("l");
    });

    cy.get('[class^="circle_circle"]').each(($div, index) => {
      if (index === 2) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("l");
    });

    cy.get('[class^="circle_circle"]').each(($div, index) => {
      $div.hasClass("default"); //дефолтный цвет
      if (index === 0) cy.wrap($div).contains("o");
      if (index === 1) cy.wrap($div).contains("l");
      if (index === 2) cy.wrap($div).contains("l");
      if (index === 3) cy.wrap($div).contains("e");
      if (index === 4) cy.wrap($div).contains("h");
    });
  });
});
