// <editor-fold desc="Imports">

/* Import styles */
import '../assets/styles/general.css';
import '../assets/styles/normalize.css';

/* Import classes */
// import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import RootContainer from '#src/components/basic_structure/root-container';
import HeaderView from '#src/view/header/header-view';
import checkInstance from '#src/utils/utils';

// </editor-fold desc="Imports">

export default class App {
  public readonly root: HTMLElement | null;

  public rootContainer: RootContainer | null;

  public headerView: HeaderView | null;

  constructor(rootToken: string = 'body') {
    this.headerView = null;
    this.root = checkInstance(document.querySelector(rootToken), HTMLElement);
    this.rootContainer = null;
    this.createView();
  }

  public createView(): void {
    this.rootContainer = new RootContainer();
    this.headerView = new HeaderView();
  }

  private appendView(): void {
    checkInstance(this.rootContainer, RootContainer).addInnerElement(
      checkInstance(checkInstance(this.headerView, HeaderView).getHTMLElement(), HTMLElement)
    );
    checkInstance(this.root, HTMLElement).append(
      checkInstance(checkInstance(this.rootContainer, RootContainer).getHTMLElement(), HTMLElement)
    );
  }

  /**
   * Onload work method: entry point for most code.
   */
  private onloadStartWork(): void {
    this.appendView();
  }

  public start(): void {
    /* Listener for start onload work */
    window.addEventListener('load', () => {
      this.onloadStartWork();
    });
  }
}
