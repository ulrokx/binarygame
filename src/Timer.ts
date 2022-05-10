interface TimerOptions {
  refreshInterval: number;
}

export class Timer {
  private _timeoutId: number = 0;
  private _startTime: Date;
  private _callback: (ms?: number) => void;
  private _refreshInterval: number = 20;
  constructor(
    callback: (ms?: number) => void,
    options?: TimerOptions
  ) {
    this._startTime = new Date();
    this._callback = callback;
    if (options) {
      if (options.refreshInterval) {
        this._refreshInterval = options.refreshInterval;
      }
    }
  }

  start() {
    this._timeoutId = window.setTimeout(
      () => this._callback(this.getTime()),
      this._refreshInterval
    );
  }

  stop() {
    clearTimeout(this._timeoutId);
  }

  restart() {
    this.stop();
    this.start();
  }

  getTime() {
    return new Date().getTime() - this._startTime.getTime();
  }
}
