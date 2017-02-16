import {TravelingSalesmanProblem} from "../tsp";
import {Util} from "../util/util";
import {Algorithm} from "./algorithm";
import {Swap} from "../util/swap";


/**
 * This class implements the algorithm to solve the traveling salesman problem.
 */
export class LocalImprovement extends Algorithm {

  private do3opt: boolean = false;
  private tour: Array<number> = null;

  constructor(do3opt: boolean, tour: Array<number>) {
    super();
    this.do3opt = do3opt;
    this.tour = tour;
  }


  /**
   * Solve the algorithm using the famous 2-opt and 3-opt algorithm.
   * @param tsp instance of the problem
   * @returns the best found tour on the problem instance
   */
  public solve(tsp: TravelingSalesmanProblem): Array<number> {


    let n: number = tsp.map.size();
    let tour: Array<number> = (this.tour == null) ? Algorithm.rndTour(n) : this.tour;
    let time: number = tsp.evaluate(tour);


    let swap: Swap;

    while (true) {

      swap = this.next2optSwapSlow(tsp, tour, time);

      // no improvement
      if (swap == null) break;

      // perform the swap
      Util.swapInverse(tour, swap.i, swap.j);
      if (swap.k != null && swap.l != null) Util.swapInverse(tour, swap.k, swap.l);
      time = swap.time;

    }

    return tour;
  }


  private next2optSwapSlow(tsp: TravelingSalesmanProblem, tour: Array<number>, time: number): Swap {

    let swap: Swap = new Swap(0,0,null,null,time);

    let n: number = tsp.map.size();

    for (let i: number = 1; i < n - 1; i++) {
      for (let j: number = i + 1; j < n; j++) {

        Util.swapInverse(tour, i, j);
        let timeIf2optSwap: number = tsp.evaluate(tour);
        Util.swapInverse(tour, i, j);

        if (timeIf2optSwap < swap.time) swap = new Swap(i, j, null, null, timeIf2optSwap);

      }
    }
    return (swap.j == 0 && swap.i == 0) ? null : swap;
  }




  private nextSwap(tsp: TravelingSalesmanProblem, tour: Array<number>, time: number): Swap {

    let swap: Swap = null;

    let n: number = tsp.map.size();

    for (let i: number = 1; i < n - 1; i++) {
      for (let j: number = i + 1; j < n; j++) {

        let timeIf2optSwap: number = this.if2optSwap(tour, i, j, time, tsp.map);
        if (swap == null || timeIf2optSwap < swap.time) swap = new Swap(i, j, null, null, timeIf2optSwap);

        if (this.do3opt) {

          for (let k: number = i + 1; k < j; k++) {

            let timeIfSwapBegin: number = this.if3optSwapBegin(tour, i, k, j, time, tsp.map);
            if (swap == null || timeIfSwapBegin < swap.time) swap = new Swap(i, j, i, k, timeIfSwapBegin);


            let timeIfSwapEnd: number = this.if3optSwapEnd(tour, i, k, j, time, tsp.map);
            if (swap == null || timeIfSwapEnd < swap.time) swap = new Swap(i, j, k, j, timeIfSwapEnd);

          }

        }

      }
    }


    // if swap does not improve return null
    return (swap.time < time) ? swap : null;


  }


}


/*


 let copy: Array<number> = tour.slice(0);
 Util.swapInverse(copy, i, j);

 let timeIfSwapBeginSlow: number = this.if2optSwap(copy, i, k, timeIf2optSwap, tsp.compMap);
 let timeIfSwapEndSlow: number = this.if2optSwap(copy, k, j, timeIf2optSwap, tsp.compMap);


 console.log(timeIfSwapBeginSlow);
 console.log(timeIfSwapBegin);

 console.log(timeIfSwapEndSlow);
 console.log(timeIfSwapEnd);

 console.log("----------------");

 */
