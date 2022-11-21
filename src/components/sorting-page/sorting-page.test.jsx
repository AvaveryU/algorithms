import { render } from "@testing-library/react";
import { ElementStates } from "../../types/element-states";
import { BrowserRouter as Router } from "react-router-dom";
import { SortingPage } from "./sorting-page";
import { sortOnIncrement, sortOnDecrement } from "./utils";

describe("Тестирование алгоритмов сортировки выбором и пузырьком по возрастанию", () => {
  beforeEach(() => {
    render(
      <Router>
        <SortingPage />
      </Router>
    );
  });
  it("Корректно сортирует массив из нескольких элементов по возрастанию", async () => {
    const massiv = [
      { num: 8, color: ElementStates.Default },
      { num: 3, color: ElementStates.Default },
      { num: 5, color: ElementStates.Default },
    ];
    const outMassiv = [
      { num: 3, color: ElementStates.Modified },
      { num: 5, color: ElementStates.Modified },
      { num: 8, color: ElementStates.Modified },
    ];
    expect(await sortOnIncrement(massiv, true)).toEqual(outMassiv);
    expect(await sortOnIncrement(massiv, false)).toEqual(outMassiv);
  });

  it("Корректно сортирует пустой массив по возрастанию", async () => {
    const massiv = [];
    const outMassiv = [];
    expect(await sortOnIncrement(massiv, true)).toEqual(outMassiv);
    expect(await sortOnIncrement(massiv, false)).toEqual(outMassiv);
  });

  it("Корректно сортирует массив из одного элемента по возрастанию", async () => {
    const massiv = [{ num: 4, color: ElementStates.Default }];
    const outMassiv = [{ num: 4, color: ElementStates.Modified }];
    expect(await sortOnIncrement(massiv, true)).toEqual(outMassiv);
    expect(await sortOnIncrement(massiv, false)).toEqual(outMassiv);
  });
});
describe("Тестирование алгоритмов сортировки выбором и пузырьком по убыванию", () => {
  beforeEach(() => {
    render(
      <Router>
        <SortingPage />
      </Router>
    );
  });
  it("Корректно сортирует массив из нескольких элементов по убыванию", async () => {
    const massiv = [
      { num: 8, color: ElementStates.Default },
      { num: 3, color: ElementStates.Default },
      { num: 5, color: ElementStates.Default },
    ];
    const outMassiv = [
      { num: 8, color: ElementStates.Modified },
      { num: 5, color: ElementStates.Modified },
      { num: 3, color: ElementStates.Modified },
    ];
    expect(await sortOnDecrement(massiv, true)).toEqual(outMassiv);
    expect(await sortOnDecrement(massiv, false)).toEqual(outMassiv);
  });
});

it("Корректно сортирует пустой массив по убыванию", async () => {
  const massiv = [];
  const outMassiv = [];
  expect(await sortOnDecrement(massiv, true)).toEqual(outMassiv);
  expect(await sortOnDecrement(massiv, false)).toEqual(outMassiv);
});

it("Корректно сортирует массив из одного элемента по убыванию", async () => {
  const massiv = [{ num: 4, color: ElementStates.Default }];
  const outMassiv = [{ num: 4, color: ElementStates.Modified }];
  expect(await sortOnDecrement(massiv, true)).toEqual(outMassiv);
  expect(await sortOnDecrement(massiv, false)).toEqual(outMassiv);
});
