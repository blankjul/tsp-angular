import {Map} from "./map";


/**
 * This class represents the problem itself, where the evaluation functions
 * returns the function value which has to be minimized.
 */
export class TravelingSalesmanProblem {

  // map where the salesman travels on
  public map: Map;


  constructor(map: Map) {
    this.map = map;
  }

  /**
   * Evaluates a permutation vector on a given map
   * @param route Rote which the salesman intends to travel
   * @returns {number} traveling time
   */
  public evaluate(route: Array<number>): number {
    let time:number = 0;
    let n:number = this.map.size();
    for(let i:number = 0; i < n-1; i++) {
      time += this.map.distByIndex(route[i], route[i+1]);
    }
    time += this.map.distByIndex(route[n-1], route[0]);
    return time;
  }


}
