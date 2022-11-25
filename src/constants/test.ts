import { ElementStates } from "../types/element-states";

export const CIRCLE_CIRCLE = '[class^="circle_circle"]';
export const CIRCLE_CONTENT = '[class*="circle_content"]';
export const INPUT_TEXT = 'input[type="text"]';
export const BUTTON = "button";
export const INPUT__PLACEHOLDER_TEXT = 'input[placeholder="Введите текст"]';
export const INPUT__PLACEHOLDER_INDEX = 'input[placeholder="Введите индекс"]';
export const CLASS__SMALL = "[class*=small]";

export const BUTTON__ADD = "Добавить";
export const BUTTON__CLEAR = "Очистить";
export const BUTTON__DELETE = "Удалить";

export const massivLong = [
  { num: 8, color: ElementStates.Default },
  { num: 3, color: ElementStates.Default },
  { num: 5, color: ElementStates.Default },
];
export const outMassivLong = [
  { num: 3, color: ElementStates.Modified },
  { num: 5, color: ElementStates.Modified },
  { num: 8, color: ElementStates.Modified },
];
export const massivEmpty = [];
export const massivShort = [{ num: 4, color: ElementStates.Default }];
export const outMassivShort = [{ num: 4, color: ElementStates.Modified }];
export const outMassivDecrement = [
  { num: 8, color: ElementStates.Modified },
  { num: 5, color: ElementStates.Modified },
  { num: 3, color: ElementStates.Modified },
];
