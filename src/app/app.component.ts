import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {TravelingSalesmanProblem} from "../model/tsp";
import {Map} from "../model/map";
import {Point} from "../model/point";
import {Algorithm} from "../model/algorithm";
import {MapComponent} from "./map.component";
import {Tour} from "../model/tour";


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

  }


  onStart() {
    let algorithm: Algorithm = new Algorithm();

    //algorithm.addListener((tour) => {this.update(this.tsp, tour);});

    this.tour.set(algorithm.solve(this.tsp));
    this.map.update();

  }


}
