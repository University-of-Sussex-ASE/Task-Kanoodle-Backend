import { PIECES } from './pyramid.const';

export class DancingLinkX {
  left: any[];
  right: any[];
  up: any[];
  down: any[];
  column: any[];
  row: any[];
  count: any[];
  header: any[];
  maxColumn: any;
  answer: any[];
  answers: any[];
  counter: any;

  constructor(nodeCount, rowCount, columnCount, isComplete) {
    this.left = Array(nodeCount).fill(0);
    this.right = Array(nodeCount).fill(0);
    this.up = Array(nodeCount).fill(0);
    this.down = Array(nodeCount).fill(0);

    this.column = Array(nodeCount).fill(0);
    this.row = Array(nodeCount).fill(0);

    this.count = Array(columnCount + 1).fill(0);
    this.header = Array(rowCount + 1).fill(0);

    this.maxColumn = isComplete ? columnCount : columnCount - PIECES;

    this.answer = [];
    this.answers = [];

    for (let i = 0; i <= columnCount; i++) {
      this.left[i] = i === 0 ? columnCount : i - 1;
      this.right[i] = i === columnCount ? 0 : i + 1;
      this.up[i] = i;
      this.down[i] = i;

      this.column[i] = i;
      this.row[i] = 0;

      this.count[i] = 0;
    }
    this.counter = columnCount;
  }

  link(row, column) {
    this.counter++;
    this.column[this.counter] = column;
    this.row[this.counter] = row;
    this.count[column]++;
    this.up[this.counter] = this.up[column];
    this.down[this.counter] = column;
    this.down[this.up[column]] = this.counter;
    this.up[column] = this.counter;
    if (this.header[row] === 0) {
      this.header[row] = this.counter;
      this.left[this.counter] = this.counter;
      this.right[this.counter] = this.counter;
    } else {
      this.left[this.counter] = this.left[this.header[row]];
      this.right[this.counter] = this.header[row];
      this.right[this.left[this.header[row]]] = this.counter;
      this.left[this.header[row]] = this.counter;
    }
  }
  knownStep(index) {
    this.delete(this.column[this.header[index]]);
    this.answer.push(index);
    for (let i = this.right[this.header[index]]; i !== this.header[index]; i = this.right[i]) {
      this.delete(this.column[i]);
    }
    return;
  }
  delete(column) {
    this.right[this.left[column]] = this.right[column];
    this.left[this.right[column]] = this.left[column];
    for (let i = this.down[column]; i !== column; i = this.down[i]) {
      for (let j = this.right[i]; j !== i; j = this.right[j]) {
        this.up[this.down[j]] = this.up[j];
        this.down[this.up[j]] = this.down[j];
        this.count[this.column[j]]--;
      }
    }
  }
  recover(column) {
    for (let i = this.up[column]; i !== column; i = this.up[i]) {
      for (let j = this.left[i]; j !== i; j = this.left[j]) {
        this.up[this.down[j]] = j;
        this.down[this.up[j]] = j;
        this.count[this.column[j]]++;
      }
    }
    this.right[this.left[column]] = column;
    this.left[this.right[column]] = column;
  }
  spread(level, levelNeeded, stepsList) {
    if (level >= levelNeeded) {
      const steps = this.answer.slice();
      stepsList.push(steps);
      return;
    }
    let now = this.right[0];
    let leastCount = Infinity;
    for (let i = this.right[0]; i !== 0 && i <= this.maxColumn; i = this.right[i]) {
      if (this.count[i] < leastCount) {
        leastCount = this.count[i];
        now = i;
      }
    }
    this.delete(now);
    for (let i = this.down[now]; i !== now; i = this.down[i]) {
      this.answer.push(this.row[i]);
      for (let j = this.right[i]; j !== i; j = this.right[j]) {
        this.delete(this.column[j]);
      }
      this.spread(level + 1, levelNeeded, stepsList);
      for (let j = this.left[i]; j !== i; j = this.left[j]) {
        this.recover(this.column[j]);
      }
      this.answer.pop();
    }
    this.recover(now);
    return;
  }

  dance() {
    let now = this.right[0];
    if (now === 0 || now > this.maxColumn) {
      const result = this.answer.slice();
      this.answers.push(result);
      return;
    }
    let leastCount = Infinity;
    for (let i = this.right[0]; i !== 0 && i <= this.maxColumn; i = this.right[i]) {
      if (this.count[i] < leastCount) {
        leastCount = this.count[i];
        now = i;
      }
    }
    this.delete(now);
    for (let i = this.down[now]; i !== now; i = this.down[i]) {
      this.answer.push(this.row[i]);
      for (let j = this.right[i]; j !== i; j = this.right[j]) {
        this.delete(this.column[j]);
      }
      this.dance();
      for (let j = this.left[i]; j !== i; j = this.left[j]) {
        this.recover(this.column[j]);
      }
      this.answer.pop();
    }
    this.recover(now);
    return;
  }
  getResult() {
    return this.answers;
  }
}
