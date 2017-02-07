import {TravelingSalesmanProblem} from "../tsp";
import {Util} from "../util/util";
import {Swap} from "../swap";
import {Map} from "../map";


/**
 * This class implements the algorithm to solve the traveling salesman problem.
 */
export abstract class Algorithm {



  /**
   * Solve the problem.
   * @param tsp instance of the problem
   * @returns the best found tour on the problem instance
   */
  public abstract solve(tsp: TravelingSalesmanProblem): Array<number> ;


  private listener: {(tour: Array<number>): void;}[] = [];

  public addListener(listener: {(tour: Array<number>): void;}) {
    this.listener.push(listener);
  }

  protected notify(tour: Array<number>) {
    this.listener.forEach(l => {
      l(tour);
    });
  }



  protected rndTour(n: number): Array<number> {

    let tour: Array<number> = new Array<number>();
    for (let i: number = 1; i < n; i++) {
      tour.push(i);
    }
    Util.shuffle(tour);
    tour.unshift(0);
    return tour;
  }


  protected ifSwap(tour:Array<number>, i:number, j:number, timeBeforeSwap:number, map:Map) {
    let result: number = timeBeforeSwap;
    let n:number = map.size();
    result -= map.distByIndex(tour[i - 1], tour[i]);
    result -= map.distByIndex(tour[j], tour[(j + 1) % n]);
    result += map.distByIndex(tour[i - 1], tour[j]);
    result += map.distByIndex(tour[i], tour[(j + 1) % n]);
    return result;
  }



}
