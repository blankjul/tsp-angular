export class Tour {

  public array:Array<number>;


  constructor(tour: Array<number>) {
    this.array = tour;
  }

  public get(): Array<number> {
    return this.array;
  }

  public set(value: Array<number>) {
    this.array = value;
  }


  public ith(i:number) : number {
    return this.array[i];
  }

  public length() {
    return this.array.length;
  }

}
