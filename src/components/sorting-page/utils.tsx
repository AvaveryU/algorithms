import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TPropItem } from "../../types/types";

//функция для перестановки элементов массива и замены цвета circle
export const swap = (
  arr: TPropItem[],
  firstIndex: number,
  secondIndex: number,
  color: ElementStates,
  setState: any
) => {
  const temp = arr[firstIndex].num;
  arr[firstIndex].num = arr[secondIndex].num;
  arr[secondIndex].num = temp;
  arr[firstIndex].color = color;
  arr[secondIndex].color = color;

  setState([...arr]);
  arr[firstIndex].color = ElementStates.Modified;
  arr[secondIndex].color = ElementStates.Modified;
};

//функция рандомного массива
export const randomArr = () => {
  const minLen = 3;
  const maxLen = 17; // max длина массива
  const minNum = 0;
  const maxNum = 100; // max число в массиве
  const length = Math.round(Math.random() * (maxLen - minLen) + minLen);
  const max = Math.round(Math.random() * (maxNum - minNum) + minNum);
  return Array.apply(null, Array(length)).map(() => {
    return { num: Math.round(Math.random() * max), color: ElementStates.Default }; //определенная структура элементов массива
  });
};
