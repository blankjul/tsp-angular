import {TravelingSalesmanProblem} from "../tsp";
import {Util} from "../util/util";
import {Algorithm} from "./algorithm";



class Swap {

  public i: number;
  public j: number;
  public k: number;
  public l: number;

  public time: number;


  constructor(i: number, j: number, k: number, l: number, time: number) {
    this.i = i;
    this.j = j;
    this.k = k;
    this.l = l;
    this.time = time;
  }
}




/**
 * This class implements the algorithm to solve the traveling salesman problem.
 */
export class LocalImprovementBackup extends Algorithm {



  /**
   * Solve the algorithm using the famous 2-opt and 3-opt algorithm.
   * @param tsp instance of the problem
   * @returns the best found tour on the problem instance
   */
  public solve(tsp: TravelingSalesmanProblem): Array<number> {


    let n: number = tsp.map.size();
    let tour: Array<number> = this.rndTour(n);
    let time: number = tsp.evaluate(tour);


    let swap:Swap;

    while (true) {

      swap = this.nextSwap(tsp,tour,time);

      // no improvement
      if (swap == null) break;

      // perform the swap
      Util.swapInverse(tour, swap.i, swap.j);
      if (swap.k != null && swap.l != null) Util.swapInverse(tour, swap.k, swap.l);
      time = swap.time;


    }

    return tour;
  }



  private nextSwap(tsp: TravelingSalesmanProblem, tour: Array<number>, time: number) : Swap {

    let swap: Swap = null;

    let n: number = tsp.map.size();

    for (let i: number = 1; i < n - 1; i++) {
      for (let j: number = i + 1; j < n; j++) {

        let timeIfSwap:number = this.ifSwap(tour,i,j,time,tsp.map);
        if ( swap == null || timeIfSwap < swap.time) swap = new Swap(i, j, null, null, timeIfSwap);

        /*

        let copy: Array<number> = tour.slice(0);
        Util.swapInverse(copy, i, j);

        for (let k: number = i + 1; k < j; k++) {

          let timeIfSwapBegin: number = this.ifSwap(copy, i, k, timeIfSwap, tsp.map);
          if (swap == null || timeIfSwapBegin < swap.time) swap = new Swap(i, j, i, k, timeIfSwapBegin);

          let timeIfSwapEnd: number = this.ifSwap(copy, k, j, timeIfSwap, tsp.map);
          if (swap == null || timeIfSwapEnd < swap.time) swap = new Swap(i, j, k, j, timeIfSwapEnd);

        }

*/

      }
    }

    // if swap does not improve return null
    return (swap.time < time) ? swap : null;


  }






}
