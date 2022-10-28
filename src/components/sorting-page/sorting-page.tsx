import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TPropItem } from "../../types/types";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { randomArr, swap } from "./utils";

export const SortingPage: React.FC = () => {
  const [flag, setFlag] = useState(false); //флаг для активной кнопки
  const [massiv, setMassiv] = useState<TPropItem[]>();
  const [isChecked, setChecked] = useState(true); //флаг для активной радиокнопки

  //для очистки асинхронных запросов при размонтировании компонента
  useEffect(() => {
    setMassiv([...randomArr()]);
    return () => {
      sortMassiveIncrement();
      sortMassiveDecrement();
    };
  }, []);

  //функция при клике на "Новый массив"
  const getNewMassive = () => {
    setMassiv([...randomArr()]);
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
          swap(massiv, minInd, i, ElementStates.Changing, setMassiv);
        }
        massiv[length - 1].color = ElementStates.Modified;
      }
      //если выбран метод сортировки ПУЗЫРЕК
      else {
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < length - i - 1; j++) {
            if (massiv[j].num > massiv[j + 1].num) {
              await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)); //пауза для визуализации
              swap(massiv, j, j + 1, ElementStates.Changing, setMassiv);
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
          swap(massiv, i, maxInd, ElementStates.Changing, setMassiv);
        }
      } //если выбран метод сортировки ПУЗЫРЕК
      else {
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < length - i - 1; j++) {
            if (massiv[j].num < massiv[j + 1].num) {
              await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)); //пауза для визуализации
              swap(massiv, j, j + 1, ElementStates.Changing, setMassiv);
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
