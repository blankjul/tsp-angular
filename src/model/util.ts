export class Util {

  /**
   * @param a to shuffle
   * @returns {Array<T>}
   */
  static shuffle<T>(a: Array<T>) {
    let counter = a.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

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


}
