import {TravelingSalesmanProblem} from "../tsp";
import {Swap} from "../swap";
import {TourWithSwap} from "../swap.tour";
import {Algorithm} from "./algorithm";


/**
 * This class implements the algorithm to solve the traveling salesman problem.
 */
export class LocalImprovement extends Algorithm {


  /**
   * Solve the algorithm using the famous 2-opt and 3-opt algorithm.
   * @param tsp instance of the problem
   * @returns the best found tour on the problem instance
   */
  public solve(tsp: TravelingSalesmanProblem): Array<number> {

    /*
     let m: Map = new Map();
     for (let i: number = 0; i < 10; i++) {
     m.add(new Point(rndInt(0, 100), rndInt(0, 100)));
     }
     let problem:TravelingSalesmanProblem = new TravelingSalesmanProblem(m);

     let start:Tour = new Tour([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
     let startTime:number = problem.evaluate(start.get());
     console.log(startTime);

     let copy: Array<number> = [].concat(start.get());
     this.performSwap(copy,1,8);
     this.performSwap(copy,3,6);

     console.log("Slow Swap:")
     console.log(problem.evaluate(copy));



     let tourWithSwap: TourWithSwap = new TourWithSwap(start.get(), m, startTime);
     tourWithSwap.add(new Swap(1, 8));
     tourWithSwap.add(new Swap(3, 6));

     console.log("Fast Swap:")
     console.log(tourWithSwap.time);

     */

    let n: number = tsp.map.size();
    let rnd: Array<number> = this.rndTour(n);
    let time: number = tsp.evaluate(rnd);
    let tour: TourWithSwap = new TourWithSwap(rnd, tsp.map, time);

    //console.log(tour.get);
    //console.log(tour.time);


    while (true) {

      let n: number = tsp.map.size();

      let bestSwap: Swap = null;

      for (let i: number = 1; i < n - 1; i++) {
        for (let j: number = i + 1; j < n; j++) {
          let swap: Swap = new Swap(i, j);
          let timeAfterSwap: number = tour.ifSwap(new Swap(i, j));
          if (timeAfterSwap < tour.time) bestSwap = swap;
        }
      }

      // no improvement
      if (bestSwap == null) break;

      tour.add(bestSwap);
      tour.persist();

      //console.log(tour.get);
      //console.log(tour.time);

    }

    return tour.get;
  }


}
