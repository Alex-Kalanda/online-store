export interface IRangeOptions {
  rangeTitle: string; // must be one word without spaces!
  scaleLimits: [number, number];
  currentPoses: [number, number];
  cbRender: () => void;
  symbolsAfterComma: number;
  step: number;
  symbol: string;
}
