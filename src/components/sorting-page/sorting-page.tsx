import React from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
// extraClass={styles.frame}
export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.content}>
        <RadioInput label="Выбор" extraClass={styles.radio1} />
        <RadioInput label="Пузрёк" extraClass={styles.radio2} />
        <Button text="По&nbsp;возрастанию" sorting={Direction.Ascending} linkedList="small" extraClass={styles.frame} />
        <Button text="По&nbsp;убыванию" sorting={Direction.Descending} linkedList="small" extraClass={styles.frame} />
        <Button text="Новый массив" linkedList="small" extraClass={styles.massive} />
      </div>
    </SolutionLayout>
  );
};
