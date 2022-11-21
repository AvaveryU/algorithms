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
import { randomArr, sortOnDecrement, sortOnIncrement, swap } from "./utils";

export const SortingPage: React.FC = () => {
  //const [flag, setFlag] = useState(false); //флаг для активной кнопки
  const [massiv, setMassiv] = useState<TPropItem[]>([]);
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
    //setFlag(true);
    if (massiv) {
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      sortOnIncrement(massiv, isChecked, setMassiv);
    }
    // setFlag(false);
  };

  //сортировка по убыванию
  const sortMassiveDecrement = async () => {
    //setFlag(true);
    if (massiv) {
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      sortOnDecrement(massiv, isChecked, setMassiv);
    }
    //setFlag(false);
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
          //disabled={flag ? true : false}
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
