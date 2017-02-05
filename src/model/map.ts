import {Point} from "./point"


/**
 * Map represents a map where the salesman can travel on.
 * As distance metric the euclidean distance is used.
 */
export class Map {

  protected points: Array<Point> = new Array<Point>();


  public add(p: Point) {
    this.points.push(p);
  }


  public remove(idx: number) {
    if (idx > -1) {
      this.points.splice(idx, 1);
    }
  }

  /**
   * Returns the euclidean distance between two points
   * @param a First Point
   * @param b Second Point
   * @returns {number} Euclidean distance
   */
  public dist(a: Point, b: Point): number {
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
  }


  /**
   * Returns the euclidean distance between two cities by fetched by index
   * @param a Index of the first city
   * @param b Index of the second city
   * @returns {number} Euclidean distance
   */
  public distByIndex(a: number, b: number): number {
    return this.dist(this.points[a], this.points[b]);
  }


  /**
   * @returns {number} number of cities where the salesman can travel on
   */
  public size(): number {
    return this.points.length;
  }


  public get(idx: number): Point {
    return this.points[idx];
  }


}
