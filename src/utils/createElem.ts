const createElem = (tag: string, id = '', className = ''): HTMLElement => {
  const element = document.createElement(tag) as HTMLElement;

  if (id) {
    element.id = id;
  }

  if (className) {
    element.classList.add(className);
  }

  return element;
};

export default createElem;
