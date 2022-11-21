import { Dispatch, SetStateAction } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TPropItem } from "../../types/types";

//сортирвка выбором по убыванию и возрастанию
export const sortOnIncrement = async (
  arr: TPropItem[],
  isChecked: boolean, //флаг радиокнопки
  setMassiv?: Dispatch<SetStateAction<TPropItem[]>>
) => {
  const { length } = arr;
  //если выбран метод сортировки ВЫБОР
  if (isChecked) {
    for (let i = 0; i < length - 1; i++) {
      let minInd = i;
      for (let q = i + 1; q < length; q++) {
        if (arr[q].num < arr[minInd].num) {
          minInd = q;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)); //пауза для визуализации
      swap(arr, minInd, i, ElementStates.Changing, setMassiv);
      arr[length - 1].color = ElementStates.Modified;
    }
    //если выбран метод сортировки ПУЗЫРЕК
  } else if (!isChecked) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (arr[j].num > arr[j + 1].num) {
          await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)); //пауза для визуализации
          swap(arr, j, j + 1, ElementStates.Changing, setMassiv);
        }
      }
    }
  }
  if (setMassiv) setMassiv([...arr]);
  return arr;
};

export const sortOnDecrement = async (
  arr: TPropItem[],
  isChecked: boolean, //флаг радиокнопки
  setMassiv?: Dispatch<SetStateAction<TPropItem[]>>
) => {
  const { length } = arr;
  //если выбран метод сортировки ВЫБОР
  if (isChecked) {
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let q = i + 1; q < length; q++) {
        if (arr[q].num > arr[maxInd].num) {
          maxInd = q;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)); //пауза для визуализации
      swap(arr, i, maxInd, ElementStates.Changing, setMassiv);
    }
  } //если выбран метод сортировки ПУЗЫРЕК
  else {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (arr[j].num < arr[j + 1].num) {
          await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)); //пауза для визуализации
          swap(arr, j, j + 1, ElementStates.Changing, setMassiv);
        }
      }
    }
  }
  if (setMassiv) setMassiv([...arr]);
  return arr;
};
//функция для перестановки элементов массива и замены цвета circle
export const swap = (
  arr: TPropItem[],
  firstIndex: number,
  secondIndex: number,
  color: ElementStates,
  setMassiv?: Dispatch<SetStateAction<TPropItem[]>>
) => {
  const temp = arr[firstIndex].num;
  arr[firstIndex].num = arr[secondIndex].num;
  arr[secondIndex].num = temp;
  arr[firstIndex].color = color;
  arr[secondIndex].color = color;
  if (setMassiv) setMassiv([...arr]);
  arr[firstIndex].color = ElementStates.Modified;
  arr[secondIndex].color = ElementStates.Modified;
  return arr;
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
