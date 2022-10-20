import React, { useRef, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
// extraClass={styles.frame}
export const SortingPage: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки
  const [massivLetter, setMassivLetter] = useState<number[]>();

  const randomArr = () => {
    let minLen = 3;
    let maxLen = 17;
    let minNum = 0;
    let maxNum = 100;
    let length = Math.round(Math.random() * (maxLen - minLen) + minLen);
    let max = Math.round(Math.random() * (maxNum - minNum) + minNum);
    return Array.apply(null, Array(length)).map(function () {
      return Math.round(Math.random() * max);
    });
  };

  //функция для перестановки символов и замены цвета circle
  const swap = (arr: number[], firstIndex: number, secondIndex: number, color: ElementStates) => {
    //   const temp = arr[firstIndex];
    //   if (firstIndex <= secondIndex) {
    //     arr[firstIndex] = arr[secondIndex];
    //     arr[secondIndex] = temp;
    //     arr[firstIndex].color = color;
    //     arr[secondIndex].color = color;
    //   }
    //   setMassivLetter([...arr]);
    //   arr[firstIndex].color = ElementStates.Modified;
    //   arr[secondIndex].color = ElementStates.Modified;
  };

  const getSortMassive = (arr: any) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let q = i + 1; q < length; q++) {
        if (arr[q] > arr[maxInd]) {
          maxInd = q;
        }
      }
      swap(arr, i, maxInd, ElementStates.Changing);
    }
  };
  const getNewMassive = () => {
    setFlag(true);
    let randomMassiv = randomArr();
    setMassivLetter(randomMassiv);
  };
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.content}>
        <RadioInput label="Выбор" extraClass={styles.radio1} />
        <RadioInput label="Пузрёк" extraClass={styles.radio2} />
        <Button
          text="По&nbsp;возрастанию"
          sorting={Direction.Ascending}
          linkedList="small"
          extraClass={styles.frame}
          onClick={getSortMassive}
        />
        <Button text="По&nbsp;убыванию" sorting={Direction.Descending} linkedList="small" extraClass={styles.frame} />
        <Button text="Новый массив" linkedList="small" extraClass={styles.massive} onClick={getNewMassive} />
      </div>
      <div className={styles.circle}>
        {massivLetter &&
          massivLetter.map((item, index) => {
            return <Column index={item} key={index} extraClass={styles.column} />;
          })}
      </div>
    </SolutionLayout>
  );
};
