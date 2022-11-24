import {
  BUTTON,
  BUTTON__ADD,
  BUTTON__CLEAR,
  BUTTON__DELETE,
  CIRCLE_CIRCLE,
  CIRCLE_CONTENT,
  INPUT_TEXT,
} from "../../src/constants/test";

describe("page queue display correctly", () => {
  before(() => {
    cy.visit("/queue");
  });

  it("page has input field and disabled button and default queue", () => {
    //проверка существования поля ввода и пустое ли оно
    cy.get(INPUT_TEXT).should("have.value", "");
    cy.get(INPUT_TEXT).should("be.empty");
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__ADD);
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__CLEAR);
    cy.get(CIRCLE_CONTENT).should("have.length", 7);
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  //добавление первого элемента
  it("write a first element in input field", () => {
    cy.get(INPUT_TEXT).type(`30`); //цифра для добавления
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__ADD); // кнопка Добавить становится активной
  });

  it("click button and add element correсtly and clear input field", () => {
    cy.get(BUTTON).contains(BUTTON__ADD).click();
    cy.get(INPUT_TEXT).clear(); //пустое поле
    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      if (index === 0) {
        cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("30");
        cy.get(CIRCLE_CONTENT).find('[class*="circle_tail"]').contains("tail");
      }
    });
    cy.wait(500);
  });

  it("first element have default color and buttons activated", () => {
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__ADD);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__CLEAR);
  });

  //добавление второго элемента
  it("write a second element in input field", () => {
    cy.get(INPUT_TEXT).type(`YP`); //строка для проверки
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__ADD); // кнопка Добавить становится активной
  });

  it("click button and add element correсtly and clear input field", () => {
    cy.get(BUTTON).contains(BUTTON__ADD).click();
    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("30");
      if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("YP");
    });
    cy.wait(500);
    //проверка курсоров head и tail
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 0) {
        cy.wrap($div).find('[class*="circle_head"]').contains("head");
      }
      if (index === 1) {
        cy.wrap($div).find('[class*="circle_tail"]').contains("tail");
      }
    });
    cy.get(INPUT_TEXT).clear(); //пустое поле
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__ADD);
  });
  // проверка активности кнопок
  it("all element have default color and buttons activated", () => {
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__CLEAR);
  });

  //добавление третьего элемента
  it("write a third element in input field", () => {
    cy.get(INPUT_TEXT).type(`232`); //строка для проверки
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__ADD); // кнопка Добавить становится активной
  });

  it("click button and add element correсtly and clear input field", () => {
    cy.get(BUTTON).contains(BUTTON__ADD).click();
    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("30");
      if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("YP");
      if (index === 2) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("232");
    });
    cy.wait(500);
    //проверка курсоров head и tail
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 0) {
        cy.wrap($div).find('[class*="circle_head"]').contains("head");
      }
      if (index === 2) {
        cy.wrap($div).find('[class*="circle_tail"]').contains("tail");
      }
    });
    cy.get(INPUT_TEXT).clear(); //пустое поле
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__ADD);
  });
  // проверка активности кнопок
  it("all element have default color and buttons activated", () => {
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__CLEAR);
  });

  //удаление элементов
  it("click button and element delete correсtly", () => {
    cy.get(BUTTON).contains(BUTTON__DELETE).click();
    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)");
      if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("YP");
      if (index === 2) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("232");
    });
    //проверка курсоров head и tail
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 1) {
        cy.wrap($div).find('[class*="circle_head"]').contains("head");
      }
      if (index === 2) {
        cy.wrap($div).find('[class*="circle_tail"]').contains("tail");
      }
    });
    cy.wait(500);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__CLEAR);
  });

  // проверка активности кнопок
  it("all element have default color and buttons activated", () => {
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__CLEAR);
  });

  //очистить элементы
  it("click button and clear elements correсtly", () => {
    cy.get(BUTTON).contains(BUTTON__CLEAR).click();
    cy.get(CIRCLE_CIRCLE).each(($div) => {
      expect($div.text(" "));
    });
  });

  it("all buttons disabled and circle has default color", () => {
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__ADD);
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__CLEAR);
  });
});
