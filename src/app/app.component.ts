import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {TravelingSalesmanProblem} from "../model/tsp";
import {Map} from "../model/map";
import {Point} from "../model/point";
import {LocalImprovementBackup} from "../model/algorithms/local.improvement.bak";
import {MapComponent} from "./map.component";
import {Tour} from "../model/tour";
import {LocalImprovement} from "../model/algorithms/local.improvement";
import {StopWatch} from "../model/util/stop.watch";
import {Util} from "../model/util/util";
import {Random} from "../model/util/random";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild("map") canvas;

  @ViewChild(MapComponent) map: MapComponent;


  private tsp: TravelingSalesmanProblem = new TravelingSalesmanProblem(new Map());
  private tour: Tour = new Tour([]);


  ngAfterViewInit(): void {
    this.map.listener.push((p: Point) => {
      this.tsp.map.add(p);
      this.map.update();
    });


    Util.rnd = new Random(0.001);

    for (let i: number = 0; i < 100; i++) {
      this.tsp.map.add(new Point(Util.rndInt(0, 500), Util.rndInt(0, 500)));
    }
    this.map.update();




  }


  onStart() {
    //algorithm.addListener((tour) => {this.update(this.tsp, tour);});


    let stopwatch:StopWatch = new StopWatch(false);


    stopwatch.start();
    let result: Array<number> =  new LocalImprovementBackup().solve(this.tsp);
    stopwatch.stop();
    stopwatch.print();

    /*
    let stopwatch2:StopWatch = new StopWatch(false);
    stopwatch2.start();
    let result: Array<number> = new LocalImprovement().solve(this.tsp);
    stopwatch2.stop();
    stopwatch2.print();
    */


    this.tour.set(result);

    console.log(this.tour.get())
    console.log(this.tsp.evaluate(this.tour.get()));


    this.map.update();

  }


}
