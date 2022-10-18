import React from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.content}>
        <Input placeholder="Введите текст" type="text" extraClass={styles.frame} maxLength={4} isLimitText />
        <Button text="Добавить в head" linkedList="small" extraClass={styles.button} />
        <Button text="Добавить в tail" linkedList="small" extraClass={styles.button} />
        <Button text="Удалить из head" linkedList="small" extraClass={styles.button} />
        <Button text="Удалить из tail" linkedList="small" extraClass={styles.button} />
        <Input placeholder="Введите индекс" type="text" extraClass={styles.frame} maxLength={1} />
        <Button text="Добавить по индексу" linkedList="big" extraClass={styles.button__first} />
        <Button text="Удалить по индексу" linkedList="big" extraClass={styles.button__second} />
      </div>
    </SolutionLayout>
  );
};
