export class Piece {
  points;
  data: any;
  blockIndex: any;
  shapeindex: number;
  static HEIGHT: number;
  static WIDTH: number;

  constructor(data, blockIndex, shapeindex = 0, points = []) {
    this.data = data;
    this.blockIndex = blockIndex;
    this.points = points;
    this.shapeindex = shapeindex;
    if (shapeindex === 0 && points.length === 0) {
      for (let i = 0; i < Piece.HEIGHT; i++) {
        for (let j = 0; j < Piece.WIDTH; j++) {
          if ((data[i] & (1 << (Piece.WIDTH - j - 1))) !== 0) {
            this.points.push({ x: j, y: i });
          }
        }
      }
      this.normalize();
    }
  }
  flip() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] = { x: Piece.WIDTH - this.points[i].x - 1, y: this.points[i].y };
    }
    this.normalize();
    this.shapeindex++;
  }
  rotate() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] = { x: Piece.HEIGHT - this.points[i].y - 1, y: this.points[i].x };
    }
    this.normalize();
    this.shapeindex++;
    return this;
  }
  size() {
    return this.points.length;
  }
  normalize() {
    let minx = Piece.WIDTH;
    let miny = Piece.HEIGHT;
    for (const p of this.points) {
      minx = Math.min(minx, p.x);
      miny = Math.min(miny, p.y);
    }
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] = { x: this.points[i].x - minx, y: this.points[i].y - miny };
    }
  }
}

Piece.WIDTH = 4;
Piece.HEIGHT = 4;

export class PyramidPattern {
  floors: any[];
  diagonalsleft: any[];
  diagonalsright: any[];
  ORDER: any;
  constructor(order) {
    this.floors = [];
    this.diagonalsleft = [];
    this.diagonalsright = [];
    this.ORDER = order;
    let index = 0;
    for (let floor = 0; floor < this.ORDER; floor++) {
      this.floors[floor] = [];
      for (let y = 0; y <= floor; y++) {
        for (let x = 0; x <= floor; x++) {
          this.floors[floor].push(++index);
        }
      }
    }
    for (let plane = 0; plane < 2 * this.ORDER - 1; plane++) {
      this.diagonalsleft[plane] = [];
      this.diagonalsright[plane] = [];
      const size = this.ORDER - Math.abs(this.ORDER - 1 - plane);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          if (x <= y) {
            const floor = this.ORDER - 1 - (y - x);
            const offset = plane - this.ORDER + 1;
            if (offset < 0) {
              this.diagonalsleft[plane].push(this.floors[floor][x * (floor + 1) + floor + offset - x]);
              this.diagonalsright[plane].push(this.floors[floor][(floor + offset - x) * (floor + 1) + floor - x]);
            } else {
              this.diagonalsleft[plane].push(this.floors[floor][(x + offset) * (floor + 1) + floor - x]);
              this.diagonalsright[plane].push(this.floors[floor][(floor - x) * (floor + 1) + floor - offset - x]);
            }
          } else {
            this.diagonalsleft[plane].push(0);
            this.diagonalsright[plane].push(0);
          }
        }
      }
    }
  }
  size() {
    return (this.ORDER * (this.ORDER + 1) * (this.ORDER * 2 + 1)) / 6;
  }
  getValidSteps(piece, steps) {
    let count = 0;
    for (let floor = 0; floor < this.ORDER; floor++) {
      for (let y = 0; y <= floor; y++) {
        for (let x = 0; x <= floor; x++) {
          let valid = true;
          for (const p of piece.points) {
            if (p.x + x < 0 || p.x + x > floor) {
              valid = false;
              break;
            }
            if (p.y + y < 0 || p.y + y > floor) {
              valid = false;
              break;
            }
            if (this.floors[floor][(p.y + y) * (floor + 1) + p.x + x] === 0) {
              valid = false;
              break;
            }
          }
          if (valid) {
            const step = { blockIndex: piece.blockIndex, shapeindex: (floor << 3) | piece.shapeindex, x, y, indices: [] };
            for (const p of piece.points) {
              step.indices.push(this.floors[floor][(p.y + y) * (floor + 1) + p.x + x]);
            }
            steps.push(step);
            count++;
          }
        }
      }
    }
    for (let plane = 0; plane < 2 * this.ORDER - 1; plane++) {
      const size = this.ORDER - Math.abs(this.ORDER - 1 - plane);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          let valid = true;
          for (const p of piece.points) {
            if (p.x + x < 0 || p.x + x >= size) {
              valid = false;
              break;
            }
            if (p.y + y < 0 || p.y + y >= size) {
              valid = false;
              break;
            }
            if (this.diagonalsleft[plane][(p.y + y) * size + p.x + x] === 0) {
              valid = false;
              break;
            }
          }
          if (valid) {
            const step = { blockIndex: piece.blockIndex, shapeindex: (1 << 6) | (plane << 3) | piece.shapeindex, x, y, indices: [] };
            for (const p of piece.points) {
              step.indices.push(this.diagonalsleft[plane][(p.y + y) * size + p.x + x]);
            }
            steps.push(step);
            count++;
          }
        }
      }
    }
    for (let plane = 0; plane < 2 * this.ORDER - 1; plane++) {
      const size = this.ORDER - Math.abs(this.ORDER - 1 - plane);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          let valid = true;
          for (const p of piece.points) {
            if (p.x + x < 0 || p.x + x >= size) {
              valid = false;
              break;
            }
            if (p.y + y < 0 || p.y + y >= size) {
              valid = false;
              break;
            }
            if (this.diagonalsright[plane][(p.y + y) * size + p.x + x] === 0) {
              valid = false;
              break;
            }
          }
          if (valid) {
            const step = { blockIndex: piece.blockIndex, shapeindex: (1 << 7) | (plane << 3) | piece.shapeindex, x, y, indices: [] };
            for (const p of piece.points) {
              step.indices.push(this.diagonalsright[plane][(p.y + y) * size + p.x + x]);
            }
            steps.push(step);
            count++;
          }
        }
      }
    }
    return count;
  }
  formatMatrix(solution) {
    const piecematrix = new Array(this.size() + 1).fill(0);
    for (const step of solution) {
      for (const index of step.indices) {
        piecematrix[index] = step.blockIndex;
      }
    }
    const result = [];
    for (let i = 0; i < this.ORDER; i++) {
      result.push([]);
      for (let j = 0; j < this.ORDER; j++) {
        for (let k = 0; k <= j; k++) {
          if (j >= i) {
            result[i].push(piecematrix[this.floors[j][i * (j + 1) + k]]);
          } else {
            result[i].push(-1);
          }
        }
        result[i].push(-1);
      }
    }
    return result;
  }
}
