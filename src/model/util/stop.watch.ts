
export class StopWatch {

  private _startTime:number = 0;
  private _stopTime:number = 0;
  private _running:boolean = false;
  private _performance:boolean;


  constructor(performance: boolean) {
    this._performance = performance;
  }

  get performance() : boolean{
    return this._performance === false ? false : !!window.performance;
  }

  get currentTime() {
    return this.performance ? window.performance.now() : new Date().getTime();
  }

  public start() {
    this._startTime = this.currentTime;
    this._running = true;
  }

  public stop() {
    this._stopTime = this.currentTime;
    this._running = false;
  }

  public getElapsedMilliseconds() : number {
    if (this._running) {
      this._stopTime = this.currentTime;
    }
    return this._stopTime - this._startTime;
  }

  public getElapsedSeconds() : number {
    return this.getElapsedMilliseconds() / 1000;
  }

  public print() {
    var currentName = name || 'Elapsed:';
    console.log(currentName, '[' + this.getElapsedMilliseconds() + 'ms]', '[' + this.getElapsedSeconds() + 's]');
  }

}


