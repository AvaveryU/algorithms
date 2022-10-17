import React from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <div className={styles.content}>
        <Input placeholder="Введите текст" type="text" extraClass={styles.frame} maxLength={11} isLimitText />
        <Button text="Развернуть" linkedList="small" />
      </div>
    </SolutionLayout>
  );
};
