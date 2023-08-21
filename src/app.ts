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
import { handleRoute, startRouting } from './routing/router';
import View from './view/view';

// </editor-fold desc="Imports">

export default class App {
  private readonly root: HTMLElement;

  private rootContainer: RootContainer | null;

  private headerView: HeaderView | null;

  private currentMainView: View | null;

  private footerView: FooterView | null;

  constructor(rootToken: string = 'body') {
    this.root = checkInstance(document.querySelector(rootToken), HTMLElement);
    this.rootContainer = null;

    this.headerView = null;
    this.currentMainView = null;
    this.footerView = null;

    this.createView();
  }

  public createView(): void {
    this.rootContainer = new RootContainer();
    this.headerView = new HeaderView();
    this.currentMainView = new MainView();
    this.footerView = new FooterView();
  }

  private appendView(): void {
    checkInstance(this.rootContainer, RootContainer).addInnerElement(
      checkInstance(checkInstance(this.headerView, HeaderView).getHTMLElement(), HTMLElement)
    );
    checkInstance(this.rootContainer, RootContainer).addInnerElement(
      checkInstance(checkInstance(this.currentMainView, MainView).getHTMLElement(), HTMLElement)
    );
    checkInstance(this.rootContainer, RootContainer).addInnerElement(
      checkInstance(checkInstance(this.footerView, FooterView).getHTMLElement(), HTMLElement)
    );
    this.root.append(
      checkInstance(checkInstance(this.rootContainer, RootContainer).getHTMLElement(), HTMLElement)
    );
  }

  private onRoute = (): void => {
    const res = handleRoute();
    res.then((Value: new () => object) => {
      const newPage = new Value() as View;
      const newElement = newPage.getHTMLElement() as HTMLElement;
      const oldElement = this.currentMainView?.getHTMLElement() as HTMLElement;
      this.rootContainer?.getHTMLElement()?.replaceChild(newElement, oldElement);
      this.currentMainView = newPage;
    });
  };

  /**
   * Onload work method: entry point for most code.
   */
  private onloadStartWork(): void {
    this.appendView();
    startRouting(this.onRoute);
  }

  public start(): void {
    /* Listener for start onload work */
    window.addEventListener('load', () => {
      this.onloadStartWork();
    });
  }
}
