import {TravelingSalesmanProblem} from "../tsp";
import {Algorithm} from "./algorithm";
import {MatrixMap} from "../maps/matrix.map";


export class Greedy extends Algorithm {


  /**
   * Solve the algorithm using the greedy strategy
   * @param tsp instance of the problem
   * @returns the best found tour on the problem instance
   */
  public solve(tsp: TravelingSalesmanProblem): Array<number> {

    let n: number = tsp.map.size();
    let tour: Array<number> = [0];
    let current: number = 0;

    // create a list to track visited cities
    let visited: Set<number> = new Set<number>();
    visited.add(current);


    // until every city was iterated
    while (tour.length < n) {

      let next:number = null;
      let nextDist:number;


      // find the next best city
      for (let i: number = 1; i < n; i++) {
        // if visited do not consider anymore
        if (visited.has(i)) continue;
        else if (next == null || tsp.map.distByIndex(current,i) < nextDist) {
          next = i;
          nextDist = tsp.map.distByIndex(current,i);
        }
      }

      tour.push(next);
      current = next;
      visited.add(next);


    }


    return tour;

  }


}
