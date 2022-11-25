import { BUTTON, CIRCLE_CIRCLE, INPUT_TEXT } from "../../src/constants/test";
import { ElementStates } from "../../src/types/element-states";

describe("page string display correctly", () => {
  before(() => {
    cy.visit("/recursion");
  });

  it("page has input field and disabled button", () => {
    //проверка существования поля ввода и пустое ли оно.
    cy.get(INPUT_TEXT).should("have.length", 1);
    cy.get(INPUT_TEXT).should("be.empty");

    cy.get(BUTTON).should("be.disabled").contains("Развернуть"); //кнопка неактивна
  });

  it("write a string in input field", () => {
    cy.get(INPUT_TEXT).type("hello"); //слово для проверки
    cy.get(BUTTON).should("be.enabled"); // кнопка становится активной
  });

  it("click button and string unwrapping correсtly", () => {
    cy.get(BUTTON).contains("Развернуть").click();
    cy.get(BUTTON).should("be.disabled");

    //находим circle и на каждом делаем проверку
    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      $div.hasClass(ElementStates.Default); //дефолтный цвет
      if (index === 0) cy.wrap($div).contains("h");
      if (index === 1) cy.wrap($div).contains("e");
      if (index === 2) cy.wrap($div).contains("l");
      if (index === 3) cy.wrap($div).contains("l");
      if (index === 4) cy.wrap($div).contains("o");
    });

    cy.wait(1000);

    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      if (index === 0 || index === 4) {
        cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }
    });

    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("o");
      if (index === 4) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("h");

      if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("e");
      if (index === 3) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("l");
    });

    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      if (index === 1) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("l");
      if (index === 3) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("e");

      if (index === 2) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("l");
    });

    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      if (index === 2) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("l");
    });

    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      $div.hasClass(ElementStates.Default); //дефолтный цвет
      if (index === 0) cy.wrap($div).contains("o");
      if (index === 1) cy.wrap($div).contains("l");
      if (index === 2) cy.wrap($div).contains("l");
      if (index === 3) cy.wrap($div).contains("e");
      if (index === 4) cy.wrap($div).contains("h");
    });
  });
});
