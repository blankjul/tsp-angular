import {Component, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges} from "@angular/core";
import {PointMap} from "../model/maps/point.map";
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


  // listener when it is clicked on the component
  public listener: {(point: Point): void;}[] = [];


  ngAfterViewInit(): void {


    this.getCanvas().addEventListener('click', (evt) => {
      var rect = this.getCanvas().getBoundingClientRect();

      let x: number = evt.offsetX;
      let y: number = evt.offsetY;

      this.listener.forEach(listener => {
        listener(new Point(x, y));
      });

    }, false);


  }


  private drawCities(map: PointMap) {
    for (let i: number = 0; i < map.size(); i++) {
      let p: Point = map.get(i);
      this.drawRectangle(p, 4,"#000000");
    }
  }

  private drawSelected(selected: Point) {
    this.drawRectangle(selected, 8,"#FF0000");
  }

  private drawHome(home: Point) {
    this.drawRectangle(home, 8,"#003399");
  }

  private drawRectangle(point:Point, size:number, color:string) {
    let canvas = this.canvas.nativeElement;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
  }


  private drawTour(map: PointMap, tour: Array<number>) {

    // nothing to draw
    if (tour.length <= 1) return;

    let ctx = this.getCanvasContext();

    ctx.beginPath();

    ctx.moveTo(map.get(tour[0]).x, map.get(tour[0]).y);
    for (let i: number = 1; i < tour.length; i++) {
      ctx.lineTo(map.get(tour[i]).x, map.get(tour[i]).y);
    }
    ctx.lineTo(map.get(tour[0]).x, map.get(tour[0]).y);
    ctx.closePath();

    ctx.stroke();
  }


  public update(map:PointMap, tour:Array<number>, selected:Point) {

    let ctx = this.getCanvasContext();
    ctx.clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);

    if (tour != null) this.drawTour(map, tour);
    if (map != null) this.drawCities(map);
    if (selected != null) this.drawSelected(selected);
    if (map.points.length > 0) this.drawHome(map.points[0]);

  }


  getCanvas() {
    return this.canvas.nativeElement;
  }

  getCanvasContext() {
    return this.getCanvas().getContext("2d");
  }


}
