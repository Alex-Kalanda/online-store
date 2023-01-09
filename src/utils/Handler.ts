import { findElem } from './findElem';

type Callback = (e: Event) => void;

class Handler {
  static set(type: string, cb: Callback, ownerSelector: string): void {
    setTimeout(() => {
      findElem(ownerSelector).addEventListener(type, cb);
    });
  }
}

export default Handler;
