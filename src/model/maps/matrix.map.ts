import {Map} from "./map";


export class MatrixMap extends Map {


  public matrix: number[][] = [];


  constructor(n: number) {
    super();
    this.init(n);

  }

  set(a: number, b: number, value: number): void {
    this.matrix[a][b] = value;
  }

  distByIndex(a: number, b: number): number {
    return this.matrix[a][b];
  }

  size(): number {
    return this.matrix.length;
  }

  clear() {
    this.init(this.size());
  }


  init(n: number) {
    this.matrix = [];
    for (let i: number = 0; i < n; i++) {
      let l = [];
      for (let j: number = 0; j < n; j++) {
        l.push(0);
      }
      this.matrix.push(l);
    }
  }


}
