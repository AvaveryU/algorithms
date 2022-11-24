import { render } from "@testing-library/react";
import { ElementStates } from "../../types/element-states";
import { BrowserRouter as Router } from "react-router-dom";
import { SortingPage } from "./sorting-page";
import { sortOnIncrement, sortOnDecrement } from "./utils";
import {
  massivLong,
  massivEmpty,
  outMassivLong,
  massivShort,
  outMassivShort,
  outMassivDecrement,
} from "../../constants/test";

describe("Тестирование алгоритмов сортировки выбором и пузырьком по возрастанию", () => {
  beforeEach(() => {
    render(
      <Router>
        <SortingPage />
      </Router>
    );
  });
  it("Корректно сортирует массив из нескольких элементов по возрастанию", async () => {
    expect(await sortOnIncrement(massivLong, true)).toEqual(outMassivLong);
    expect(await sortOnIncrement(massivLong, false)).toEqual(outMassivLong);
  });

  it("Корректно сортирует пустой массив по возрастанию", async () => {
    expect(await sortOnIncrement(massivEmpty, true)).toEqual(massivEmpty);
    expect(await sortOnIncrement(massivEmpty, false)).toEqual(massivEmpty);
  });

  it("Корректно сортирует массив из одного элемента по возрастанию", async () => {
    expect(await sortOnIncrement(massivShort, true)).toEqual(outMassivShort);
    expect(await sortOnIncrement(massivShort, false)).toEqual(outMassivShort);
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
    expect(await sortOnDecrement(massivLong, true)).toEqual(outMassivDecrement);
    expect(await sortOnDecrement(massivLong, false)).toEqual(outMassivDecrement);
  });
});

it("Корректно сортирует пустой массив по убыванию", async () => {
  expect(await sortOnDecrement(massivEmpty, true)).toEqual(massivEmpty);
  expect(await sortOnDecrement(massivEmpty, false)).toEqual(massivEmpty);
});

it("Корректно сортирует массив из одного элемента по убыванию", async () => {
  expect(await sortOnDecrement(massivShort, true)).toEqual(outMassivShort);
  expect(await sortOnDecrement(massivShort, false)).toEqual(outMassivShort);
});
