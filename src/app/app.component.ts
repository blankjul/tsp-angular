import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {TravelingSalesmanProblem} from "../model/tsp";
import {PointMap} from "../model/maps/point.map";
import {Point} from "../model/point";
import {LocalImprovement} from "../model/algorithms/local.improvement";
import {Greedy} from "../model/algorithms/greedy";
import {Algorithm} from "../model/algorithms/algorithm";
import {MapComponent} from "./map.component";
import {StopWatch} from "../model/util/stop.watch";
import {Util} from "../model/util/util";
import {Random} from "../model/util/random";
import {MatrixMap} from "../model/maps/matrix.map";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(MapComponent) compMap: MapComponent;


  algorithms = [{
    value: new Greedy(),
    label: 'Greedy'
  }, {
    value: new LocalImprovement(false, null),
    label: '2opt'
  }, {
    value: new LocalImprovement(true, null),
    label: '3opt'
  }];

  selectedIndex: number = 1;

  public txtInput: string;


  private map: PointMap = new PointMap()
  private tour: Array<number>;
  private selected: number;


  ngAfterViewInit(): void {
    this.compMap.listener.push((p: Point) => {
      this.map.add(p);
      this.update();
    });


    Util.rnd = new Random(0.001);

    for (let i: number = 0; i < 50; i++) {
      this.map.add(new Point(Util.rndInt(0, 500), Util.rndInt(0, 500)));
    }
    this.update();


  }


  onStart() {


    let algorithm: Algorithm = this.algorithms[this.selectedIndex].value;
    let tsp: TravelingSalesmanProblem = new TravelingSalesmanProblem(this.map);

    /*
    let stopwatch: StopWatch = new StopWatch(false);
    stopwatch.start();
    let result: Array<number> = algorithm.solve(tsp);
    stopwatch.stop();
    stopwatch.print();
    this.tour = result;
    this.update();
    console.log(this.tour)
    console.log(tsp.evaluate(this.tour));

*/

    let n: number = tsp.map.size();
    let matrix: MatrixMap = new MatrixMap(n);
    for (let i: number = 0; i < n; i++) {
      for (let j: number = 0; j < n; j++) {
        matrix.set(i, j, tsp.map.distByIndex(i, j));
        matrix.set(j, i, tsp.map.distByIndex(i, j));
      }
    }

    tsp.map = matrix;
    let result2: Array<number> = algorithm.solve(tsp);
    console.log(result2)
    console.log(tsp.evaluate(result2));


    let matrixLarge: MatrixMap = new MatrixMap(2 * n);


    for (let i: number = 0; i < n; i++) {
      for (let j: number = i+1; j < n; j++) {
        matrixLarge.set(i, j, Infinity);
        matrixLarge.set(j, i, Infinity);
        matrixLarge.set(i + n, j + n, Infinity);
        matrixLarge.set(j + n, i + n, Infinity);
      }
    }

    for (let i: number = 0; i < n; i++) {
      for (let j: number = 0; j < n; j++) {
        matrixLarge.set(i + n, j, matrix.distByIndex(i, j));
        matrixLarge.set(j, i + n, matrix.distByIndex(i, j));
      }
    }

    console.log(matrixLarge);


    let tourSmall : Array<number> = Algorithm.rndTour(n);
    console.log(tourSmall);
    let tour : Array<number> = [];
    for (let i: number = 0; i < n; i++) {
      tour.push(tourSmall[i]);
      tour.push(tourSmall[i]+n);
    }

    console.log(tour);

    tsp.map = matrixLarge;
    let result3: Array<number> = new LocalImprovement(false,tour).solve(tsp);
    console.log(result3)
    console.log(tsp.evaluate(result3));

    this.tour = [];
    for (let i: number = 0; i < 2*n; i++) {
      if(result3[i] < n) this.tour.push(result3[i]);
    }

    this.update();

  }


  onAdd(x: number, y: number) {
    this.map.add(new Point(x, y));
    this.tour = null;
    this.update();
  }

  onRemove(point: Point) {
    this.map.points = this.map.points.filter(item => item !== point);
    this.tour = null;
    this.update();
  }

  onSelect(idx: number) {
    if (this.selected == idx) {
      this.selected = null;
    } else if (this.map.points.length > 0 && idx != 0) {
      this.selected = idx;
    }
    this.update();
  }

  swapSelectedUp() {
    if (this.selected == null || this.selected == 0) return;
    Util.swap(this.map.points, this.selected, this.selected - 1);
    this.selected--;
    this.tour = null;
    this.update();
  }

  swapSelectedDown() {
    if (this.selected == null || this.selected == this.map.points.length - 1) return;
    Util.swap(this.map.points, this.selected, this.selected + 1);
    this.selected++;
    this.tour = null;
    this.update();
  }

  swapSelectedUppest() {
    if (this.selected == null || this.selected == 0) return;
    Util.swap(this.map.points, this.selected, 0);
    this.selected = 0;
    this.tour = null;
    this.update();
  }

  reset() {
    this.map.clear();
    this.tour = null;
    this.selected = null;
    this.update();
  }

  onDialog() {
    this.txtInput = "";
    this.map.points.forEach(p => {
      this.txtInput += p.x + "," + p.y + "\n";
    });
  }

  onDialogSave() {
    this.map.clear();

    this.txtInput.split("\n").forEach((line: string) => {
      let array: Array<string> = line.split(",");
      if (array.length == 2) {
        this.map.add(new Point(new Number(array[0]).valueOf(), new Number(array[1]).valueOf()))
      }
    });
    this.tour = null;
    this.update();
  }

  update() {
    this.compMap.update(this.map, this.tour, this.map.points[this.selected]);
  }

}
