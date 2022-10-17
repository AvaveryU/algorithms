import React from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.content}>
        <Input placeholder="Введите текст" type="text" extraClass={styles.frame} maxLength={19} isLimitText />
        <Button text="Рассчитать" linkedList="small" />
      </div>
    </SolutionLayout>
  );
};
