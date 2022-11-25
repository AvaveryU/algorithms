import {
  INPUT__PLACEHOLDER_TEXT,
  INPUT__PLACEHOLDER_INDEX,
  CIRCLE_CIRCLE,
  CIRCLE_CONTENT,
  CLASS__SMALL,
} from "../../src/constants/test";

describe("page list display correctly", () => {
  before(() => {
    cy.visit("/list");
  });

  it("page has input field and disabled button and default queue", () => {
    //проверка существования полей ввода и пустые ли они
    cy.get(INPUT__PLACEHOLDER_TEXT).should("have.value", "");
    cy.get(INPUT__PLACEHOLDER_TEXT).should("be.empty");
    cy.get(INPUT__PLACEHOLDER_INDEX).should("have.value", "");
    cy.get(INPUT__PLACEHOLDER_INDEX).should("be.empty");
    //проверка существования кнопок
    cy.get('button[name="head"]').should("be.disabled").contains("Добавить в head");
    cy.get('button[name="tail"]').should("be.disabled").contains("Добавить в tail");
    cy.get('button[name="headRemoved"]').should("be.enabled").contains("Удалить из head");
    cy.get('button[name="tailRemoved"]').should("be.enabled").contains("Удалить из tail");
    cy.get('button[name="addElementIndex"]').should("be.disabled").contains("Добавить по индексу");
    cy.get('button[name="removeElementIndex"]').should("be.disabled").contains("Удалить по индексу");
    //отрисовка дефолтной очереди
    cy.get(CIRCLE_CONTENT).should("have.length", 4);
  });

  //добавление элемента в head
  it("add element in head", () => {
    cy.get(INPUT__PLACEHOLDER_TEXT).type(`50`);
    cy.get('button[name="head"]').should("be.enabled").contains("Добавить в head").click();
    cy.get(CIRCLE_CONTENT)
      .find(CLASS__SMALL)
      .first()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("50");
    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("50");
    });
    //проверка курсора head
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 0) {
        cy.wrap($div).first().contains("head");
      }
    });
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(INPUT__PLACEHOLDER_TEXT).clear();
  });

  //добавление элемента в tail
  it("add element in tail", () => {
    cy.get(INPUT__PLACEHOLDER_TEXT).type(`40`);
    cy.get('button[name="tail"]').should("be.enabled").contains("Добавить в tail").click();
    cy.wait(500);
    cy.get(CIRCLE_CONTENT)
      .find(CLASS__SMALL)
      .last()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("40");
    cy.wait(500);
    cy.get(CIRCLE_CIRCLE).each(($div, index) => {
      if (index === 5) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("40");
    });
    //проверка курсора tail
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 5) {
        cy.wrap($div).last().contains("tail");
      }
    });
    cy.get(CIRCLE_CIRCLE).last().should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(INPUT__PLACEHOLDER_TEXT).clear();
  });

  //добавление элемента по индексу
  it("add element by index", () => {
    cy.get(INPUT__PLACEHOLDER_TEXT).type(`50`);
    cy.get(INPUT__PLACEHOLDER_INDEX).type(`3`);
    cy.get('button[name="addElementIndex"]').should("be.enabled").contains("Добавить по индексу").click();
    cy.wait(500);
    let start = 0;
    while (start <= 3) {
      cy.get(CIRCLE_CONTENT).find(CLASS__SMALL).should("have.css", "border", "4px solid rgb(210, 82, 225)");
      start++;
    }
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 4) {
        cy.wrap($div).find(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(127, 224, 81)");
      }
      cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get(INPUT__PLACEHOLDER_TEXT).clear();
      cy.get(INPUT__PLACEHOLDER_INDEX).clear();
    });
  });

  //удаление элемента по индексу
  it("delete element by index", () => {
    cy.get(INPUT__PLACEHOLDER_INDEX).type(`3`);
    cy.get('button[name="removeElementIndex"]').should("be.enabled").contains("Удалить по индексу").click();
    let start = 0;
    while (start <= 3) {
      cy.get(CIRCLE_CONTENT).find(CLASS__SMALL).should("have.css", "border", "4px solid rgb(210, 82, 225)");
      cy.get(CIRCLE_CIRCLE).each(($div, index) => {
        if (index <= 3) cy.wrap($div).should("have.css", "border", "4px solid rgb(210, 82, 225)");
      });
      start++;
    }
    cy.wait(500);
    //проверка курсора tail
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 6) {
        cy.wrap($div).last().contains("tail");
      }
    });
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get(INPUT__PLACEHOLDER_INDEX).clear();
  });

  //удаление из head
  it("delete element from head", () => {
    cy.get('button[name="headRemoved"]').should("be.enabled").contains("Удалить из head").click();
    cy.get(CIRCLE_CONTENT)
      .find("[class*='circle_small']")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("not.have.text", "");
    //проверка удаления курсора head
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 0) cy.wrap($div).should("not.have.text", "");
    });
    cy.wait(500);
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    //проверка появления курсора head
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 0) cy.wrap($div).first().contains("head");
    });
  });

  //удаление из tail
  it("delete element from tail", () => {
    cy.get('button[name="tailRemoved"]').should("be.enabled").contains("Удалить из tail").click();
    cy.get(CIRCLE_CONTENT)
      .find("[class*='circle_small']")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("not.have.text", "");
    cy.wait(500);
    //проверка удаления курсора tail
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 5) cy.wrap($div).should("not.have.text", "");
    });
    cy.get(CIRCLE_CIRCLE).should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.wait(500);
    //проверка появления курсора tail
    cy.get(CIRCLE_CONTENT).each(($div, index) => {
      if (index === 5) cy.wrap($div).contains("tail");
    });
  });
});
