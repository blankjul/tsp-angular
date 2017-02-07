import {Tour} from "./tour";
import {Swap} from "./swap";
import {Map} from "./map";
import {Util} from "./util/util";


export class TourWithSwap {

  private _tour: Array<number>;
  private _time: number;
  private map: Map;

  private swaps: Array<Swap> = [];


  constructor(tour: Array<number>, map: Map, time: number) {
    this._tour = tour;
    this._time = time;
    this.map = map;
  }


  public add(swap: Swap) {
    this._time = this.ifSwap(swap);
    this.swaps.push(swap);

  }

  public ifSwap(swap: Swap) {
    let result: number = this.time;
    result -= this.map.distByIndex(this.ith(swap.i - 1), this.ith(swap.i));
    result -= this.map.distByIndex(this.ith(swap.j), this.ith(swap.j + 1));
    result += this.map.distByIndex(this.ith(swap.i - 1), this.ith(swap.j));
    result += this.map.distByIndex(this.ith(swap.i), this.ith(swap.j + 1));
    return result;
  }


  public length() {
    return this._tour.length;
  }


  get time(): number {
    return this._time;
  }

  get get(): Array<number> {
    return this._tour;
  }

  public ith(k: number): number {
    let idx: number = k;
    this.swaps.forEach(swap => {
      if (idx >= swap.i && idx <= swap.j) {
        idx = swap.j - (idx - swap.i);
      }
    });
    return this._tour[idx % this._tour.length];
  }

  /**
   * Persists all swaps in the tour array
   */
  public persist() {
    this.swaps.forEach(swap => {
      Util.swapInverse(this._tour, swap.i, swap.j);
    });
    this.swaps = [];
  }

}
