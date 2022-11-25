import { ElementStates } from "../../types/element-states";

//функция рандомного массива
export const randomArr = () => {
  const maxLen = 4; // max длина массива
  const maxNum = 30; // max число в массиве
  const length = maxLen;
  const max = Math.round(Math.random() * maxNum);
  return Array.apply(null, Array(length)).map(() => {
    return { element: Math.round(Math.random() * max), color: ElementStates.Default }; //определенная структура элементов массива
  });
};
