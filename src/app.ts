// <editor-fold desc="Imports">

/* Import styles */
import '../assets/styles/general.css';
import '../assets/styles/normalize.css';

/* Import classes */
// import { BasicComponent, BasicComponentConstructorArgs } from '#src/components/basic-component';
import RootContainer from '#src/components/basic_structure/root-container';
import HeaderView from '#src/view/header/header-view';
import MainView from '#src/view/main/main-view';
import FooterView from '#src/view/footer/footer-view';
import checkInstance from '#src/utils/utils';

// </editor-fold desc="Imports">

export default class App {
  private readonly root: HTMLElement;

  private rootContainer: RootContainer | null;

  private headerView: HeaderView | null;

  private mainView: MainView | null;

  private footerView: FooterView | null;

  constructor(rootToken: string = 'body') {
    this.root = checkInstance(document.querySelector(rootToken), HTMLElement);
    this.rootContainer = null;

    this.headerView = null;
    this.mainView = null;
    this.footerView = null;

    this.createView();
  }

  public createView(): void {
    this.rootContainer = new RootContainer();
    this.headerView = new HeaderView();
    this.mainView = new MainView();
    this.footerView = new FooterView();
  }

  private appendView(): void {
    checkInstance(this.rootContainer, RootContainer).addInnerElement(
      checkInstance(checkInstance(this.headerView, HeaderView).getHTMLElement(), HTMLElement)
    );
    checkInstance(this.rootContainer, RootContainer).addInnerElement(
      checkInstance(checkInstance(this.mainView, MainView).getHTMLElement(), HTMLElement)
    );
    checkInstance(this.rootContainer, RootContainer).addInnerElement(
      checkInstance(checkInstance(this.footerView, FooterView).getHTMLElement(), HTMLElement)
    );
    this.root.append(
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
