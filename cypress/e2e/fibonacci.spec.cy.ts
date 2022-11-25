import { CIRCLE_CIRCLE, INPUT_TEXT, BUTTON } from "../../src/constants/test";
import { ElementStates } from "../../src/types/element-states";

describe("page fibonacci display correctly", () => {
  before(() => {
    cy.visit("/fibonacci");
  });

  it("page has input field and disabled button", () => {
    //проверка существования поля ввода и пустое ли оно.
    cy.get(INPUT_TEXT).should("have.value", "");
    cy.get(INPUT_TEXT).should("be.empty");
    cy.get(BUTTON).should("be.disabled").contains("Рассчитать"); //кнопка неактивна
  });

  it("write a number in input field", () => {
    cy.get(INPUT_TEXT).type(`${5}`); //цифра для проверки
    cy.get(BUTTON).should("be.enabled"); // кнопка становится активной
  });

  it("click button and number calculate correсtly", () => {
    cy.get(BUTTON).contains("Рассчитать").click();
    cy.wait(500);
    cy.get(CIRCLE_CIRCLE).should("have.length", 1).contains(1);

    cy.get(CIRCLE_CIRCLE)
      .should("have.length", 2)
      .each(($div, index) => {
        $div.hasClass(ElementStates.Default); //дефолтный цвет
        if (index === 0) cy.wrap($div).contains(1);
        if (index === 1) cy.wrap($div).contains(1);
      });
    cy.wait(500);

    cy.get(CIRCLE_CIRCLE)
      .should("have.length", 3)
      .each(($div, index) => {
        $div.hasClass(ElementStates.Default); //дефолтный цвет
        if (index === 0) cy.wrap($div).contains(1);
        if (index === 1) cy.wrap($div).contains(1);
        if (index === 2) cy.wrap($div).contains(2);
      });
    cy.wait(500);

    cy.get(CIRCLE_CIRCLE)
      .should("have.length", 4)
      .each(($div, index) => {
        $div.hasClass(ElementStates.Default); //дефолтный цвет
        if (index === 0) cy.wrap($div).contains(1);
        if (index === 1) cy.wrap($div).contains(1);
        if (index === 2) cy.wrap($div).contains(2);
        if (index === 3) cy.wrap($div).contains(3);
      });
    cy.wait(500);

    cy.get(CIRCLE_CIRCLE)
      .should("have.length", 5)
      .each(($div, index) => {
        $div.hasClass(ElementStates.Default); //дефолтный цвет
        if (index === 0) cy.wrap($div).contains(1);
        if (index === 1) cy.wrap($div).contains(1);
        if (index === 2) cy.wrap($div).contains(2);
        if (index === 3) cy.wrap($div).contains(3);
        if (index === 4) cy.wrap($div).contains(5);
      });
    cy.wait(1000);

    cy.get(CIRCLE_CIRCLE)
      .should("have.length", 6)
      .each(($div, index) => {
        $div.hasClass(ElementStates.Default); //дефолтный цвет
        if (index === 0) cy.wrap($div).contains(1);
        if (index === 1) cy.wrap($div).contains(1);
        if (index === 2) cy.wrap($div).contains(2);
        if (index === 3) cy.wrap($div).contains(3);
        if (index === 4) cy.wrap($div).contains(5);
        if (index === 5) cy.wrap($div).contains(8);
      });
  });
});
