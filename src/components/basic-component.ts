import checkInstance from '#src/utils/utils';
import { ListenerCB } from '#src/types/types';

/**
 * Args for component constructor.
 */
export interface BasicComponentConstructorArgs {
  tagName: string;
  classNames: Array<string>;
  textContent?: string | null;
  callback?: ListenerCB | null;
  eventType?: string;
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
export class BasicComponent {
  public element: ComponentElementField;

  public cssClasses: string[];

  /**
   * @param {ElementParams} params
   */
  constructor(params: BasicComponentConstructorArgs) {
    this.element = null;
    this.cssClasses = params.classNames;
    this.createElement(params);
  }

  /**
   * Get HTMLElement from component object.
   * @returns {HTMLElement}
   */
  public getHTMLElement(): ComponentElementField {
    return this.element;
  }

  /**
   * Add inner HTMLElement for component.
   * @param {HTMLElement | BasicComponent} innerElement
   */
  public addInnerElement(innerElement: HTMLElement | BasicComponent): void {
    const currentComponentElement = checkInstance(this.element, HTMLElement);

    if (innerElement instanceof BasicComponent) {
      currentComponentElement.append(checkInstance(innerElement.getHTMLElement(), HTMLElement));
    } else {
      currentComponentElement.append(innerElement);
    }
  }

  /**
   * Create component HTML Element. Add CB and listener for event, when CB is specified.
   * @param {ElementParams} params
   */
  protected createElement(params: BasicComponentConstructorArgs): void {
    this.element = document.createElement(params.tagName);
    this.setCssClasses(this.cssClasses);
    if (params.textContent) {
      this.setTextContent(params.textContent);
    }
    if (params.callback) {
      this.setCallback(params.callback, params.eventType);
    }
  }

  /**
   * Add css classes.
   * @param {Array<string>} cssClasses  - list of CSS classes for component HTML Element.
   */
  public setCssClasses(cssClasses: Array<string>): void {
    checkInstance(this.element, HTMLElement).classList.add(...cssClasses);
  }

  /**
   * Add component HTML Element text content.
   * @param {string} text - new text content for component HTML Element.
   */
  public setTextContent(text = ''): void {
    checkInstance(this.element, HTMLElement).textContent = text;
  }

  /**
   * Set component HTML Element callback.
   * @param {string}    eventType - type of event for listener.
   * @param {function}  callback  - listener CB.
   */
  public setCallback(callback: ListenerCB, eventType: string = 'click'): void {
    if (typeof callback === 'function') {
      checkInstance(this.element, HTMLElement).addEventListener(eventType, (event) =>
        callback(event)
      );
    }
  }
}
