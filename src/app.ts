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
import View, { ViewLogicParams } from '#src/view/view';
import Router, { Routes } from '#src/logic/router/router';
import { PagesUrls } from '#src/logic/router/pages-params';

// </editor-fold desc="Imports">

export default class App {
  private readonly root: HTMLElement;

  private rootContainer: RootContainer | null;

  private headerView: HeaderView | null;

  private mainView: MainView | null;

  private footerView: FooterView | null;

  private readonly logicParams: ViewLogicParams;

  constructor(rootToken: string = 'body') {
    this.root = checkInstance(document.querySelector(rootToken), HTMLElement);
    while (this.root.firstElementChild) {
      this.root.firstElementChild.remove();
    }

    this.rootContainer = null;

    this.headerView = null;
    this.mainView = null;
    this.footerView = null;

    const routes = this.createRoutes();

    this.logicParams = {
      router: new Router(routes),
    };

    this.createView();
  }

  public createView(): void {
    this.rootContainer = new RootContainer();
    this.headerView = new HeaderView(this.logicParams);
    this.mainView = new MainView();
    this.footerView = new FooterView();
  }

  private appendView(): void {
    checkInstance(this.rootContainer, RootContainer).addInnerElement(
      checkInstance(this.headerView?.getHTMLElement(), HTMLElement)
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

  /**
   * Generate array of routes objects for router.
   * @return { Routes } - array of routes object.
   * @private
   */
  private createRoutes(): Routes {
    return [
      // Test startup navigation
      {
        path: ``,
        callback: async (): Promise<void> => {
          const { default: TestView1 } = await import('./view/main/test-view-1/test-view-1');
          this.setContent(PagesUrls.INDEX, new TestView1());
        },
      },
      {
        path: `${PagesUrls.INDEX}`,
        callback: async (): Promise<void> => {
          const { default: TestView1 } = await import('./view/main/test-view-1/test-view-1');
          this.setContent(PagesUrls.INDEX, new TestView1());
        },
      },
      {
        path: `${PagesUrls.LOGIN}`,
        callback: async (): Promise<void> => {
          const { default: LoginView } = await import('./view/login/login-view');
          this.setContent(PagesUrls.LOGIN, new LoginView());
        },
      },
      {
        path: `${PagesUrls.SIGN_UP}`,
        callback: async (): Promise<void> => {
          const { default: SignUpView } = await import('./view/main/signup/signup-view');
          this.setContent(PagesUrls.SIGN_UP, new SignUpView());
        },
      },
      {
        path: `${PagesUrls.ERROR_404}`,
        callback: async (): Promise<void> => {
          const { default: TestView2 } = await import('./view/main/test-view-2/test-view-2');
          this.setContent(PagesUrls.INDEX, new TestView2());
        },
      },
    ];
  }

  private setContent(newPageUrl: string, newPageViewComponent: View): void {
    // Set selected status to according link in nav-menu
    this.headerView?.setCurrentStatusToLink(newPageUrl);
    checkInstance(this.mainView, MainView).setNewPageView(newPageViewComponent);
  }

  public start(): void {
    /* Listener for start onload work */
    window.addEventListener('load', () => {
      this.onloadStartWork();
    });
  }
}
