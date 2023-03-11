import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TPropItemInList } from "../../types/types";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list";
import styles from "./list-page.module.css";
import { randomArr } from "./utils";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState<number>();
  const [flag, setFlag] = useState(false); //флаг для активной кнопки 1
  const [flagTwo, setFlagTwo] = useState(false); //флаг для активной кнопки 2
  const [flagThree, setFlagThree] = useState(false); //флаг для активной кнопки 3
  const [flagFour, setFlagFour] = useState(false); //флаг для активной кнопки 4

  const list = new LinkedList<string>();

  const initArray = randomArr();
  const [isValues, setValues] = useState<TPropItemInList[]>(initArray);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.placeholder === "Введите текст") {
      setInputValue(event.target.value);
    } else {
      setInputIndex(Number(event.target.value));
    }
  };
  //функция при клике на кнопку 'Добавить'
  const addElement = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInputValue("");
    const arr = [...isValues];
    if (event.currentTarget?.name === "head") {
      setFlag(true);
      list.insertAt(inputValue, 0); // добавление элемента в начало списка
      const head = list.getIndex(0);
      list.print();
      //0ой элемент в списке
      arr[0] = {
        ...arr[0],
        isHeadAdd: true,
        topCircle: {
          element: head ? head : inputValue,
        },
      };
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      //указываем ключи для скрытия добавляемого элемента визуально (topCircle)
      arr[0] = {
        ...arr[0],
        isHeadAdd: false,
        topCircle: undefined,
      };
      //новый элемент в начале очереди
      arr.unshift({
        element: head ? head : inputValue,
        color: ElementStates.Modified,
      });
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      arr[0].color = ElementStates.Default; //возвращаем стандартный цвет нового 0го элемента
      setFlag(false);
    }
    //если нажали на кнопку добавить в tail
    else if (event.currentTarget?.name === "tail") {
      setFlagTwo(true);
      let index = arr.length - 1;
      list.insertAt(inputValue, index); // добавление элемента в конец списка
      const tail = list.getIndex(index);
      list.print();
      //последний элемент в списке
      arr[index] = {
        ...arr[index],
        isTailAdd: true,
        topCircle: {
          element: tail ? tail : inputValue,
        },
      };
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      //указываем ключи для скрытия добавляемого элемента визуально (topCircle)
      arr[index] = {
        ...arr[index],
        isTailAdd: false,
        topCircle: undefined,
      };
      //новый элемент в начале очереди
      arr.push({
        element: tail ? tail : inputValue,
        color: ElementStates.Modified,
      });
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setValues([...arr]);
      arr[arr.length - 1].color = ElementStates.Default; //возвращаем стандартный цвет нового 0го элемента
      setFlagTwo(false);
    }
  };

  //функция при клике на кнопку 'Удалить'
  const deleteElement = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInputValue("");
    const arr = [...isValues];
    //если удаляем начало списка
    if (event.currentTarget?.name === "headRemoved") {
      setFlagThree(true);
      list.print();
      //0ой элемент в списке
      arr[0] = {
        ...arr[0],
        element: "",
        isHeadRemove: true,
        bottomCircle: {
          element: `${arr[0].element}`,
        },
      };
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      //указываем ключи для скрытия добавляемого элемента визуально (bottomCircle)
      arr[0] = {
        ...arr[0],
        isHeadRemove: false,
        bottomCircle: undefined,
      };
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      //новый элемент в начале очереди
      arr.shift();
      setValues([...arr]);
      setFlagThree(false);
      arr[0].color = ElementStates.Default; //возвращаем стандартный цвет нового 0го элемента
    }
    //если удаляем конец списка
    else if (event.currentTarget?.name === "tailRemoved") {
      setFlagFour(true);
      let index = arr.length - 1;
      list.print();
      //последний элемент в списке
      arr[index] = {
        ...arr[index],
        element: "",
        isTailRemove: true,
        bottomCircle: {
          element: `${arr[index].element}`,
        },
      };
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      //указываем ключи для скрытия добавляемого элемента визуально (bottomCircle)
      arr[index] = {
        ...arr[index],
        isTailRemove: false,
        bottomCircle: undefined,
      };
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      //новый элемент в конце очереди
      arr.pop();
      setValues([...arr]);
      setFlagFour(false);
      arr[arr.length - 1].color = ElementStates.Default; //возвращаем стандартный цвет нового 0го элемента
    }
    setValues([...arr]);
  };

  //функция при клике на кнопку 'Добавить по индексу'
  const setElementIndex = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInputIndex(Number(""));
    setInputValue("");
    const arr = [...isValues];
    let start = 0;
    list.print();
    //если нажали добавить по индексу
    if (event.currentTarget?.name === "addElementIndex" && inputIndex) {
      setFlagFour(true);
      while (start < inputIndex) {
        // элемент в списке по индексу
        arr[start] = {
          ...arr[start],
          element: arr[start]?.element ?? '',
          isElementAdd: true,
          topCircle: {
            element: inputValue ? inputValue : "",
          },
        };
        setValues([...arr]);
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        //указываем ключи для скрытия добавляемого элемента визуально (topCircle)
        arr[start] = {
          ...arr[start],
          isElementAdd: false,
          topCircle: undefined,
        };
        start++;
      }
      //новый элемент по индексу
      arr.splice(inputIndex, 0, {
        element: inputValue ? inputValue : "",
        color: ElementStates.Modified,
      });
      setValues([...arr]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      arr[inputIndex].color = ElementStates.Default; //возвращаем стандартный цвет нового 0го элемента
      setFlagFour(false);
    }
    //если нажали удаление по индексу
    if (event.currentTarget?.name === "removeElementIndex" && inputIndex) {
      setFlagFour(true);
      list.print();
      while (start <= inputIndex) {
        // элемент в списке по индексу
        arr[start] = {
          ...arr[start],
          isElementRemove: true,
          bottomCircle: {
            element: `${arr[inputIndex].element}`,
          },
          color: ElementStates.Changing,
        };
        setValues([...arr]);
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        //указываем ключи для скрытия добавляемого элемента визуально (topCircle)
        arr[start] = {
          ...arr[start],
          isElementRemove: false,
          bottomCircle: undefined,
        };
        start++;
      }
      //новый элемент по индексу
      arr.splice(inputIndex, 1);
      arr.forEach((item) => (item.color = ElementStates.Default)); // возвращаем всем элементам дефолтный цвет
      setValues([...arr]);
      setFlagFour(false);
    }
    setValues([...arr]);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.content}>
        <Input
          placeholder="Введите текст"
          type="text"
          extraClass={styles.frame}
          maxLength={4}
          isLimitText
          onChange={handleChange}
          value={inputValue || ""}
        />
        <Button
          text="Добавить в head"
          linkedList="small"
          extraClass={styles.button}
          onClick={(event) => addElement(event)}
          name={`head`}
          isLoader={!flag ? false : true}
          disabled={inputValue ? false : true}
        />
        <Button
          text="Добавить в tail"
          linkedList="small"
          extraClass={styles.button}
          onClick={(event) => addElement(event)}
          name={`tail`}
          isLoader={!flagTwo ? false : true}
          disabled={inputValue ? false : true}
        />
        <Button
          text="Удалить из head"
          linkedList="small"
          extraClass={styles.button}
          name={"headRemoved"}
          onClick={(event) => deleteElement(event)}
          isLoader={!flagThree ? false : true}
          disabled={isValues.length !== 0 ? false : true}
        />
        <Button
          text="Удалить из tail"
          linkedList="small"
          extraClass={styles.button}
          name={"tailRemoved"}
          onClick={(event) => deleteElement(event)}
          isLoader={!flagFour ? false : true}
          disabled={isValues.length !== 0 ? false : true}
        />
        <Input
          placeholder="Введите индекс"
          type="text"
          extraClass={styles.frame}
          maxLength={1}
          onChange={handleChange}
          value={inputIndex || ""}
          isLimitText
        />
        <Button
          text="Добавить по индексу"
          linkedList="big"
          extraClass={styles.button__first}
          name={"addElementIndex"}
          onClick={(event) => setElementIndex(event)}
          disabled={inputIndex && inputValue ? false : true}
        />
        <Button
          text="Удалить по индексу"
          linkedList="big"
          extraClass={styles.button__second}
          name={"removeElementIndex"}
          onClick={(event) => setElementIndex(event)}
          disabled={inputIndex && inputIndex < isValues.length ? false : true}
        />
      </div>
      <div className={styles.circle}>
        {isValues.map((item, index) => {
          return (
            <div className={styles.main} key={index}>
              <Circle
                letter={`${item.element}`}
                state={item.color}
                index={index}
                head={index === 0 && !item.isHeadAdd && !item.isHeadRemove ? "head" : ""}
                tail={index === isValues.length - 1 && !item.isTailAdd && !item.isTailRemove ? "tail" : ""}
              />
              {index !== isValues.length - 1 ? (
                <ArrowIcon fill={item.color === ElementStates.Changing ? "#D252E1" : "#0032FF"} />
              ) : null}
              {/* если сработал флаг добавления в начало списка */}
              {(item.isHeadAdd || item.isTailAdd || item.isElementAdd) && (
                <Circle
                  isSmall
                  letter={`${item.topCircle?.element}`}
                  state={ElementStates.Changing}
                  extraClass={styles.top}
                />
              )}
              {/* если сработал флаг добавления в конец списка */}
              {(item.isTailRemove || item.isHeadRemove || item.isElementRemove) && (
                <Circle
                  isSmall
                  letter={`${item.bottomCircle?.element}`}
                  state={ElementStates.Changing}
                  extraClass={styles.bottom}
                />
              )}
            </div>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
