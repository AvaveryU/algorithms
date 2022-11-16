import { ceil } from "cypress/types/lodash";

describe("page list display correctly", () => {
  before(() => {
    cy.visit("/list");
  });

  it("page has input field and disabled button and default queue", () => {
    //проверка существования полей ввода и пустые ли они
    cy.get('input[placeholder="Введите текст"]').should("have.value", "");
    cy.get('input[placeholder="Введите текст"]').should("be.empty");
    cy.get('input[placeholder="Введите индекс"]').should("have.value", "");
    cy.get('input[placeholder="Введите индекс"]').should("be.empty");
    //проверка существования кнопок
    cy.get('button[name="head"]').should("be.disabled").contains("Добавить в head");
    cy.get('button[name="tail"]').should("be.disabled").contains("Добавить в tail");
    cy.get('button[name="headRemoved"]').should("be.enabled").contains("Удалить из head");
    cy.get('button[name="tailRemoved"]').should("be.enabled").contains("Удалить из tail");
    cy.get('button[name="addElementIndex"]').should("be.disabled").contains("Добавить по индексу");
    cy.get('button[name="removeElementIndex"]').should("be.disabled").contains("Удалить по индексу");
    //отрисовка дефолтной очереди
    cy.get('[class*="circle_content"]').should("have.length", 4);
  });

  it("add buttons activation", () => {
    cy.get('input[placeholder="Введите текст"]').type(`50`);
    cy.get('button[name="head"]').should("be.enabled").contains("Добавить в head");
    cy.get('button[name="tail"]').should("be.enabled").contains("Добавить в tail");
  });

  it("add element in head", () => {
    cy.get('button[name="head"]').contains("Добавить в head").click();
    //добавление элемента в head
    cy.get('[class*="circle_content"]')
      .find("[class*=small]")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("50");
    cy.get('[class^="circle_circle"]').each(($div, index) => {
      if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("50");
    });
    cy.get('[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get('input[placeholder="Введите текст"]').clear();
  });

  // it("add element in tail", () => {
  //   cy.get('button[name="tail"]').contains("Добавить в tail").click();
  //   //добавление элемента в tail
  //   cy.get('[class*="circle_content"]').find("[class*=small]").contains("50");
  //   cy.get('[class^="circle_circle"]').each(($div, index) => {
  //     if (index === 0) cy.wrap($div).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("50");
  //   });
  //   cy.get('input[placeholder="Введите текст"]').clear();
  // });
});

// --default-color: rgb(0, 50, 255);
//   --changing-color: rgb(210, 82, 225);
//   --modified-color: rgb(127, 224, 81);
