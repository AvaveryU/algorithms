import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

type TPropItem = {
  num: number;
  color: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [flag, setFlag] = useState<boolean>(false); //флаг для активной кнопки
  const [massiv, setMassiv] = useState<TPropItem[]>();
  const [isChecked, setChecked] = useState<boolean>(true); //флаг для активной радиокнопки
  //функция рандомного массива
  const randomArr = () => {
    let minLen = 3;
    let maxLen = 17; // max длина массива
    let minNum = 0;
    let maxNum = 100; // max число в массиве

    let length = Math.round(Math.random() * (maxLen - minLen) + minLen);
    let max = Math.round(Math.random() * (maxNum - minNum) + minNum);

    return Array.apply(null, Array(length)).map(() => {
      return { num: Math.round(Math.random() * max), color: ElementStates.Default }; //определенная структура элементов массива
    });
  };
  //функция при клике на "Новый массив"
  const getNewMassive = () => {
    let randomMassiv = randomArr();
    setMassiv(randomMassiv);
  };

  //функция для перестановки элементов массива и замены цвета circle
  const swap = (arr: TPropItem[], firstIndex: number, secondIndex: number, color: ElementStates) => {
    const temp = arr[firstIndex].num;
    arr[firstIndex].num = arr[secondIndex].num;
    arr[secondIndex].num = temp;
    arr[firstIndex].color = color;
    arr[secondIndex].color = color;

    setMassiv([...arr]);
    arr[firstIndex].color = ElementStates.Modified;
    arr[secondIndex].color = ElementStates.Modified;
  };

  //сортировка по возрастанию
  const sortMassiveIncrement = async () => {
    setFlag(true);
    if (massiv) {
      const { length } = massiv;
      //если выбран метод сортировки ВЫБОР
      if (isChecked) {
        for (let i = 0; i < length - 1; i++) {
          let minInd = i;
          for (let q = i + 1; q < length; q++) {
            if (massiv[q].num < massiv[minInd].num) {
              minInd = q;
            }
          }
          await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)); //пауза для визуализации
          swap(massiv, minInd, i, ElementStates.Changing);
        }
        massiv[length - 1].color = ElementStates.Modified;
      }
      //если выбран метод сортировки ПУЗЫРЕК
      else {
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < length - i - 1; j++) {
            if (massiv[j].num > massiv[j + 1].num) {
              await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)); //пауза для визуализации
              swap(massiv, j, j + 1, ElementStates.Changing);
            }
          }
        }
      }
    }
    setFlag(false);
  };

  //сортировка по убыванию
  const sortMassiveDecrement = async () => {
    setFlag(true);
    if (massiv) {
      const { length } = massiv;
      //если выбран метод сортировки ВЫБОР
      if (isChecked) {
        for (let i = 0; i < length - 1; i++) {
          let maxInd = i;
          for (let q = i + 1; q < length; q++) {
            if (massiv[q].num > massiv[maxInd].num) {
              maxInd = q;
            }
          }
          await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)); //пауза для визуализации
          swap(massiv, i, maxInd, ElementStates.Changing);
        }
      } //если выбран метод сортировки ПУЗЫРЕК
      else {
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < length - i - 1; j++) {
            if (massiv[j].num < massiv[j + 1].num) {
              await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)); //пауза для визуализации
              swap(massiv, j, j + 1, ElementStates.Changing);
            }
          }
        }
      }
    }
    setFlag(false);
  };

  const onChange = () => {
    isChecked ? setChecked(false) : setChecked(true);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.content}>
        <RadioInput label="Выбор" extraClass={styles.radio1} name={"choice"} checked={isChecked} onChange={onChange} />
        <RadioInput
          label="Пузрёк"
          extraClass={styles.radio2}
          name={"bubble"}
          checked={!isChecked}
          onChange={onChange}
        />
        <Button
          text="По&nbsp;возрастанию"
          sorting={Direction.Ascending}
          linkedList="small"
          extraClass={styles.frame}
          onClick={sortMassiveIncrement}
        />
        <Button
          text="По&nbsp;убыванию"
          sorting={Direction.Descending}
          linkedList="small"
          extraClass={styles.frame}
          onClick={sortMassiveDecrement}
        />
        <Button
          text="Новый массив"
          linkedList="small"
          extraClass={styles.massive}
          onClick={getNewMassive}
          disabled={flag ? true : false}
        />
      </div>
      <div className={styles.circle}>
        {massiv &&
          massiv.map((item, index) => {
            return <Column index={item.num} key={index} state={item.color} extraClass={styles.column} />;
          })}
      </div>
    </SolutionLayout>
  );
};
