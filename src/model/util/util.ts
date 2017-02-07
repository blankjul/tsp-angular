import {Random} from "./random";
export class Util {

  static rnd:Random = new Random();

  /**
   * @param a to shuffle
   * @returns {Array<T>}
   */
  static shuffle<T>(a: Array<T>) {
    let counter = a.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(this.rnd.nextNumber() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      this.swap(a, counter, index);

    }

  }

  /**
   * Swaps to elements in an array
   * @param array to be swapped
   * @param a first index
   * @param b second index
   */
  static swap<T>(array: Array<T>, a: number, b: number) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }

  static swapInverse(tour: Array<number>, i: number, j: number) {
    if (i > j) throw new TypeError("Cannot perform swap!");
    for (let k: number = 0; k < (j - i) / 2; k++) {
      Util.swap(tour, i + k, j - k);
    }
  }

  static rndInt(min:number, max:number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(this.rnd.nextNumber() * (max - min)) + min;
  }


}
