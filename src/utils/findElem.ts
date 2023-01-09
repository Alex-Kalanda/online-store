const findElem = (selector: string, findArea: HTMLElement | null = null): HTMLElement => {
  if (findArea) {
    return findArea.querySelector(selector) as HTMLElement;
  }

  return document.querySelector(selector) as HTMLElement;
};

const findElems = (selector: string, findArea: HTMLElement | null = null): NodeListOf<HTMLElement> => {
  if (findArea) {
    return findArea.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  }

  return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
};

export { findElem, findElems };
