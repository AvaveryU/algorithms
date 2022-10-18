import React from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <div className={styles.content}>
        <Input placeholder="Введите текст" type="text" extraClass={styles.frame} maxLength={4} isLimitText />
        <Button text="Добавить" linkedList="small" extraClass={styles.button} />
        <Button text="Удалить" linkedList="small" extraClass={styles.button} />
        <Button text="Очистить" linkedList="small" extraClass={styles.clear} />
      </div>
    </SolutionLayout>
  );
};
