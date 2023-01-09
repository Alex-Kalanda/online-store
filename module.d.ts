declare module '*.css';
declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.webp';
declare module '*.json';

declare namespace noUiSlider {
  interface InoUiSlider {
    on: (a: string, b: (values: [number, number]) => void) => void;
  }

  interface Instance extends HTMLElement {
    noUiSlider: InoUiSlider;
  }
}
