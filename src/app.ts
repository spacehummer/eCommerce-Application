// <editor-fold desc="Imports">

/* Import styles */
import '../assets/styles/general.css';
import '../assets/styles/normalize.css';

/* Import classes */
import BasicComponent from '#src/components/basic-component';
import checkInstance from '#src/utils/utils';

// </editor-fold desc="Imports">

export default class App {
  public readonly root: HTMLElement;

  public helloWorld: BasicComponent;

  constructor() {
    this.helloWorld = new BasicComponent({
      tagName: 'div',
      classNames: ['demo-container'],
      textContent: 'Hello world!',
      callback: (e): void => {
        if (e instanceof Event) {
          checkInstance(e.target, HTMLElement).classList.toggle('demo-red');
        }
      },
    });
    this.root = checkInstance(document.getElementsByTagName('body')[0], HTMLElement);
  }

  /**
   * Onload work method: entry point for most code.
   */
  private onloadStartWork(): void {
    this.root.append(checkInstance(this.helloWorld.getElement(), HTMLElement));
  }

  public start(): void {
    /* Listener for start onload work */
    window.addEventListener('load', () => {
      this.onloadStartWork();
    });
  }
}
