import {TravelingSalesmanProblem} from "./tsp";
import {Swap} from "./swap";
import {Util} from "./util";


/**
 * This class implements the algorithm to solve the traveling salesman problem.
 */
export class Algorithm {


  private listener: {(tour: Array<number>): void;}[] = [];

  /**
   * Solve the algorithm using the famous 2-opt and 3-opt algorithm.
   * @param tsp instance of the problem
   * @returns the best found tour on the problem instance
   */
  public solve(tsp: TravelingSalesmanProblem): Array<number> {


    let n: number = tsp.map.size();
    let tour: Array<number> = this.rndTour(n);
    let time: number = tsp.evaluate(tour);

    console.log(tour);
    console.log(time);

    let swap:Swap;

    while (true) {

      swap = this.nextSwap(tsp,tour,time);

      // no improvement
      if (swap == null) break;

      // perform the swap
      this.performSwap(tour, swap.i, swap.j);
      time = swap.time;

      console.log(tour);
      console.log(time);

    }

    return tour;
  }


  private performSwap(tour: Array<number>, i:number, j:number) {

    if (i > j) throw new TypeError("Cannot perform swap!");

    for (let k:number = 0; k < (j-i) / 2; k++) {
      Util.swap(tour, i+k, j-k);
    }


  }


  private nextSwap(tsp: TravelingSalesmanProblem, tour: Array<number>, time: number) : Swap {

    let swap: Swap = new Swap(0,0,time);

    let n: number = tsp.map.size();

    for (let i: number = 1; i < n - 1; i++) {
      for (let j: number = i + 1; j < n; j++) {

        let nextTour: Array<number> = [].concat(tour);
        this.performSwap(nextTour, i, j);
        let next: Swap = new Swap(i, j, tsp.evaluate(nextTour));
        if (next.time < swap.time) swap = next;

      }
    }

    // no swap that improves found
    if (swap.i == 0 && swap.j == 0) return null;
    else return swap;


  }


  public addListener(listener: {(tour: Array<number>): void;}) {
    this.listener.push(listener);
  }

  private notify(tour: Array<number>) {
    this.listener.forEach(l => {
      l(tour);
    });
  }

  private rndTour(n: number): Array<number> {

    let tour: Array<number> = new Array<number>();
    for (let i: number = 1; i < n; i++) {
      tour.push(i);
    }
    Util.shuffle(tour);
    tour.unshift(0);
    return tour;
  }


}
