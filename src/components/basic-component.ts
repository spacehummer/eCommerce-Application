import checkInstance from '#src/utils/utils';
import { ListenerCB } from '#src/types/types';

/**
 * Args for component constructor.
 */
interface BasicComponentConstructorArgs {
  tagName: string;
  classNames: Array<string>;
  textContent: string;
  callback: ListenerCB;
}

type ComponentElementField = HTMLElement | null;

/**
 * Basic component class.
 * @typedef {{
 * tagName: string,
 * classNames: Array<string>,
 * textContent: string,
 * callback: function,
 * }} ElementParams
 */
export default class BasicComponent {
  public element: ComponentElementField;

  /**
   * @param {ElementParams} params
   */
  constructor(params: BasicComponentConstructorArgs) {
    this.element = null;
    this.createElement(params);
  }

  /**
   * Get HTMLElement from component object.
   * @returns {HTMLElement}
   */
  public getElement(): ComponentElementField {
    return this.element;
  }

  /**
   * Add inner HTMLElement for component.
   * @param {HTMLElement | BasicComponent} innerElement
   */
  public addInnerElement(innerElement: Node | BasicComponent): void {
    const currentComponentElement = checkInstance(this.element, HTMLElement);

    if (innerElement instanceof BasicComponent) {
      currentComponentElement.append(checkInstance(innerElement.getElement(), HTMLElement));
    } else {
      currentComponentElement.append(innerElement);
    }
  }

  /**
   * Create component HTML Element.
   * @param {ElementParams} params
   */
  private createElement(params: BasicComponentConstructorArgs): void {
    this.element = document.createElement(params.tagName);
    this.setCssClasses(params.classNames);
    this.setTextContent(params.textContent);
    this.setCallback(params.callback);
  }

  /**
   * Add css classes.
   * @param cssClasses
   */
  public setCssClasses(cssClasses: Array<string>): void {
    cssClasses.map((cssClass) => checkInstance(this.element, HTMLElement).classList.add(cssClass));
  }

  /**
   * Add component HTML Element text content.
   * @param {string} text
   */
  public setTextContent(text = ''): void {
    checkInstance(this.element, HTMLElement).textContent = text;
  }

  /**
   * Set component HTML Element callback.
   * @param {function} callback
   */
  public setCallback(callback: ListenerCB): void {
    if (typeof callback === 'function') {
      checkInstance(this.element, HTMLElement).addEventListener('click', (event) =>
        callback(event)
      );
    }
  }
}
