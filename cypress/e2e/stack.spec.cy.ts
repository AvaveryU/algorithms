import {
  BUTTON,
  BUTTON__ADD,
  BUTTON__CLEAR,
  BUTTON__DELETE,
  CIRCLE_CIRCLE,
  CIRCLE_CONTENT,
  INPUT_TEXT,
} from "../../src/constants/test";

describe("page stack display correctly", () => {
  before(() => {
    cy.visit("/stack");
  });

  it("page has input field and disabled button", () => {
    //проверка существования поля ввода и пустое ли оно
    cy.get(INPUT_TEXT).should("have.value", "");
    cy.get(INPUT_TEXT).should("be.empty");

    cy.get(BUTTON).should("be.disabled").contains(BUTTON__ADD);
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__CLEAR);
  });

  //добавление первого элемента
  it("write a first number in input field", () => {
    cy.get(INPUT_TEXT).type(`${30}`); //цифра для проверки
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__ADD); // кнопка Добавить становится активной
  });

  it("click button and number add correсtly and clear input field", () => {
    cy.get(BUTTON).contains(BUTTON__ADD).click();
    cy.get(INPUT_TEXT).clear(); //пустое поле
    cy.get(CIRCLE_CIRCLE).should("have.length", 1).contains(30);
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(500);
  });

  it("first number have default color and buttons activated", () => {
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__ADD);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__CLEAR);
  });

  //добавление второго элемента
  it("write a second number in input field", () => {
    cy.get(INPUT_TEXT).type(`${666}`); //цифра для проверки
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__ADD); // кнопка Добавить становится активной
  });

  it("click button and number add correсtly and clear input field", () => {
    cy.get(BUTTON).contains(BUTTON__ADD).click();
    cy.get(CIRCLE_CIRCLE)
      .should("have.length", 2)
      .each(($div, index) => {
        if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains(30);
        if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains(666);
      });
    cy.get(INPUT_TEXT).clear(); //пустое поле

    cy.wait(500);

    cy.get(BUTTON).should("be.disabled").contains(BUTTON__ADD);
  });

  it("all number have default color and buttons activated", () => {
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__CLEAR);
  });

  //удаление элементов
  it("click button and number delete correсtly", () => {
    cy.get(BUTTON).contains(BUTTON__DELETE).click();
    cy.get(CIRCLE_CIRCLE)
      .should("have.length", 2)
      .each(($div, index) => {
        if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains(666);
      });
    cy.wait(500);
    cy.get(CIRCLE_CIRCLE).should("have.length", 1);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__CLEAR);
  });

  //пробуем добавить снова элемент
  it("repeat write a second number in input field", () => {
    cy.get(INPUT_TEXT).type(`${55}`); //цифра для проверки
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__ADD); // кнопка Добавить становится активной
  });

  it("repeat click button and number add correсtly and clear input field", () => {
    cy.get(BUTTON).contains(BUTTON__ADD).click();
    cy.get(CIRCLE_CIRCLE)
      .should("have.length", 2)
      .each(($div, index) => {
        if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains(30);
        if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains(55);
      });
    cy.get(INPUT_TEXT).clear(); //пустое поле

    cy.wait(500);

    cy.get(BUTTON).should("be.disabled").contains(BUTTON__ADD);
  });

  it("repeat all number have default color and buttons activated", () => {
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__CLEAR);
  });

  //очистить элементы
  it("click button and clear numbers correсtly", () => {
    cy.get(BUTTON).contains(BUTTON__CLEAR).click();
    cy.get(CIRCLE_CONTENT).should("have.length", 0);
  });

  //пробуем добавить снова элемент
  it("repeat write a first number in input field", () => {
    cy.get(INPUT_TEXT).type(`${4}`); //цифра для проверки
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__ADD); // кнопка Добавить становится активной
  });

  it("repeat click button and number add correсtly and clear input field", () => {
    cy.get(BUTTON).contains(BUTTON__ADD).click();
    cy.get(INPUT_TEXT).clear(); //пустое поле
    cy.get(CIRCLE_CIRCLE).should("have.length", 1).contains(4);
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(500);
  });

  it("repeat first number have default color and buttons activated", () => {
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(BUTTON).should("be.disabled").contains(BUTTON__ADD);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__DELETE);
    cy.get(BUTTON).should("be.enabled").contains(BUTTON__CLEAR);
  });
});
