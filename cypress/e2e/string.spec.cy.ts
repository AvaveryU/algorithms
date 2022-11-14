describe("page string display correctly", () => {
  before(() => {
    cy.visit("/");
  });

  it("page has input field and disabled button", () => {
    //проверка существования поля ввода и пустое ли оно.
    cy.get('input[type="text"]').should("have.length", 0);
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
    //находим кружки и на каждом делаем проверку
    cy.get('[class^="circle_content"]').each(($div, index) => {
      $div.hasClass("default"); //дефолтный цвет
    });
    cy.wait(1000);
  });
});
