import {Component, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Map} from "../model/map";
import {Point} from "../model/point";
import {Tour} from "../model/tour";


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
})
export class MapComponent implements AfterViewInit {



  // canvas component in the UI
  @ViewChild("mycanvas")
  private canvas;

  // Map which is provided as parameter
  @Input()
  private map: Map;

  // The result of the current
  @Input()
  private tour: Tour;


  // listener when it is clicked on the component
  public listener: {(point: Point): void;}[] = [];


  ngAfterViewInit(): void {


    this.getCanvas().addEventListener('click', (evt) => {
      let ctx = this.getCanvasContext();
      let x: number = evt.clientX - this.getCanvas().offsetLeft;
      let y: number = evt.clientY - this.getCanvas().offsetTop;

      this.listener.forEach(listener => {
        listener(new Point(x, y));
      });

    }, false);


  }


  private drawCities(map: Map) {

    let canvas = this.canvas.nativeElement;
    let ctx = canvas.getContext("2d");

    let size: number = 4;

    for (let i: number = 0; i < map.size(); i++) {
      let p: Point = map.get(i);
      ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
    }

  }


  private drawTour(map: Map, tour: Tour) {

    // nothing to draw
    if (tour.length() <= 1) return;

    let ctx = this.getCanvasContext();

    ctx.beginPath();

    ctx.moveTo(map.get(tour.ith(0)).x, map.get(tour.ith(0)).y);
    for (let i: number = 1; i < tour.length(); i++) {
      ctx.lineTo(map.get(tour.ith(i)).x, map.get(tour.ith(i)).y);
    }
    ctx.lineTo(map.get(tour.ith(0)).x, map.get(tour.ith(0)).y);
    ctx.closePath();

    ctx.stroke();
  }


  public update() {
    let ctx = this.getCanvasContext();
    ctx.clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);

    console.log(this.tour);

    if (this.map != null) this.drawCities(this.map);
    if (this.tour != null) this.drawTour(this.map, this.tour);

  }


  private getCanvas() {
    return this.canvas.nativeElement;
  }

  private getCanvasContext() {
    return this.getCanvas().getContext("2d");
  }


}
