interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getElements: () => T[];
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  peak = (): T | null => {
    if (this.container.length !== 0) {
      return this.container[this.container.length - 1];
    } else {
      return null;
    }
  };

  getSize = () => this.container.length;

  getElements = () => {
    return this.container;
  };

  clear = () => {
    return (this.container = []);
  };
}
