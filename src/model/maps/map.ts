/**
 * PointMap represents a compMap where the salesman can travel on.
 */
export abstract class Map {


  /**
   * Distance between two indices
   * @param a Index of the first city
   * @param b Index of the second city
   * @returns {number} distance
   */
  public abstract distByIndex(a: number, b: number): number;


  /**
   * @returns {number} number of cities where the salesman can travel on
   */
  public abstract size(): number;


  /**
   * Remove all cities
   */
  public abstract clear();



}
